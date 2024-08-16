'use client';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ReadMore from '../readMore';
import './styles.css';
import Link from 'next/link';

export default function Page({ params }) {
    const [tabNumberEpisod, setTabNumberEpisod] = useState([]);
    const [episodTitle, setEpisodTitle] = useState('');
    const [episodSynopsis, setEpisodSynopsis] = useState('');
    const [numberOfEpisod, setNumberOfEpisod] = useState(1);

    async function fetchDetails() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.detail_id}`);
            const result = await response.json();
            console.log(result);

            const numberEpisod = result.data?.episodes;
            if (numberEpisod) {
                let tab = Array.from({ length: numberEpisod }, (_, i) => i + 1);
                setTabNumberEpisod(tab);
            } else {
                setTabNumberEpisod([]);
            }
        } catch (error) {
            console.log("Erreur while fetching details :", error.message);
            setTabNumberEpisod([]);
        }
    }

    async function fetchEpisodDetails(episodeNumber) {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.detail_id}/episodes/${episodeNumber}`);
            const result = await response.json();
            console.log(result);

            if (result.data) {
                setEpisodTitle(result.data.title || 'Title not available');
                setEpisodSynopsis(result.data.synopsis || 'Synopsis not available');
            } else {
                setEpisodTitle('Titre not available');
                setEpisodSynopsis('Synopsis not available');
            }
        } catch (error) {
            console.log("Erreur while fetching episod details :", error.message);
            setEpisodTitle('Error');
            setEpisodSynopsis('Error while fetching episod details');
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [params.detail_id]);

    useEffect(() => {
        if (tabNumberEpisod.length > 0) {
            fetchEpisodDetails(numberOfEpisod);
        }
    }, [numberOfEpisod, tabNumberEpisod]);

    const handleSelectChange = (event) => {
        const selectedEpisode = parseInt(event.target.value, 10);
        setNumberOfEpisod(selectedEpisode);
    };

    return (
        <main className='mt-10 mb-5'>
            <Link href={'/dashboard'}>
                <button className='border border-transparent rounded-[5px] text-[20px] bg-orange-800 text-white px-3 py-2 ml-10 hover:translate-x-[-10px] duration-300'>
                    🔙 Go Back
                </button>
            </Link>


            <section className='flex flex-col items-center gap-10 mt-5'>
                <h1 className='text-gradient font-bold text-4xl text-center'>Get Every Episode Summary</h1>
                <div className='flex flex-row mt-10 gap-10 justify-center w-auto mx-2 md:w-[52rem] gap-0 justify-between'>
                    <div className='flex flex-wrap gap-3'>
                        <h1 className='text-white font-extrabold self-center text-xl'>Filter Episod :</h1>
                        <select
                            className='border border-transparent text-[20px] text-white bg-black px-2 py-1 rounded-[5px] cursor-pointer'
                            value={numberOfEpisod}
                            onChange={handleSelectChange}
                        >
                            {tabNumberEpisod.map((element) => (
                                <option key={nanoid(10)} value={element}>{element}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row gap-2 self-center'>
                        {numberOfEpisod > 1 && (
                            <button
                                className='border border-transparent flex flex-row gap-2 justify-center items-center text-[20px] bg-black text-white cursor-pointer rounded-[5px] p-2 hover:bg-[#111] duration-500'
                                onClick={() => setNumberOfEpisod(prev => Math.max(prev - 1, 1))}
                            >
                                <span className='hidden md:block'>⬅️</span> Prev
                            </button>
                        )}
                        {numberOfEpisod < tabNumberEpisod.length && (
                            <button
                                className='border border-transparent flex flex-row gap-2 justify-center items-center text-[20px] bg-black text-white cursor-pointer rounded-[5px] p-2 hover:bg-[#111] duration-500'
                                onClick={() => setNumberOfEpisod(prev => Math.min(prev + 1, tabNumberEpisod.length))}
                            >
                                Next <span className='hidden md:block'>➡️</span>
                            </button>
                        )}
                    </div>
                </div>
                <div className='flex flex-col mt-10 gap-5 w-auto mx-2 md:w-[52rem] mx-0'>
                    <h1 className='text-white text-4xl'><span className='episod font-bold'>Episod {numberOfEpisod} :</span> <span className='font-bold episod-title leading-[1.5]'>{episodTitle}</span></h1>
                    <p className='text-white text-[19px] leading-[1.8]'>
                        <ReadMore text={episodSynopsis} maxLength={400} />
                    </p>
                </div>
            </section>
        </main>
    );
}
