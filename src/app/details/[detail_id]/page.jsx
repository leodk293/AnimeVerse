"use client";
import React, { useState, useEffect } from 'react';
import ReadMore from './readMore';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import './styles.css'

export default function Page({ params }) {
    const [animeInfos, setAnimeInfos] = useState({
        error: true,
        data: undefined
    });

    const [characters, setCharacteres] = useState({
        error: true,
        data: undefined
    })

    async function fetchDetails() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.detail_id}`);
            const result = await response.json();
            console.log(result);

            setAnimeInfos({
                error: false,
                data: result.data
            });

        } catch (error) {
            console.log(error.message);
            setAnimeInfos({
                error: true,
                data: undefined
            });
        }
    }

    async function fetchAnimeCharacters() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.detail_id}/characters`);
            const result = await response.json();
            console.log(result);

            setCharacteres({
                error: false,
                data: result.data
            })

        }
        catch (error) {
            console.log(error.message);
            setCharacteres({
                error: true,
                data: undefined
            })
        }
    }

    useEffect(() => {
        fetchDetails();
        fetchAnimeCharacters();
    }, [params.detail_id]);

    return (
        <main className="flex flex-col mt-10">
            {animeInfos.error === false && animeInfos.data ? (
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-gradient font-bold text-center text-2xl md:text-4xl'>{animeInfos.data.title}</h1>
                    <div className='flex flex-wrap justify-center gap-10 mt-10'>
                        <div className='golden-border p-1 mx-2 rounded-[5px] cursor-pointer md:mx-0'>
                            <img className='object-cover rounded-[5px] w-[25rem] h-[35rem] hover:brightness-50 duration-500' src={`${animeInfos.data.images.jpg.large_image_url}`} alt={`${animeInfos.data.title} IMAGE`} />
                        </div>
                        <div className='flex flex-col gap-7 text-white mx-2 md:mx-0'>
                            <h1 className='text-red-700 font-semibold text-4xl'>{animeInfos.data.title_japanese}</h1>
                            <p className='text-[20px]'><span className='font-semibold'>Source :</span> {animeInfos.data.source}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Duration :</span> {animeInfos.data.duration}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Number of Episodes :</span> {animeInfos.data.episodes}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Broadcast Period :</span> {animeInfos.data.aired.string}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Status :</span> {animeInfos.data.status}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Rating :</span> {animeInfos.data.rating}</p>
                            <p className='text-[20px]'><span className='font-semibold'>Popularity :</span> {animeInfos.data.popularity}</p>
                            <div className='flex flex-wrap gap-4'>
                                <button className='self-start cursor-pointer border border-transparent rounded-[5px] py-1 px-3 bg-slate-500 hover:bg-slate-400 duration-500'>
                                    <a target='_blank' className='text-[20px]' href={`${animeInfos.data.url}`}>More Info ➡️</a>
                                </button>
                                <button className='self-start cursor-pointer border border-transparent rounded-[5px] py-1 px-3 bg-orange-800 hover:bg-orange-400 duration-500'>
                                    <Link className='no-underline text-[20px]' href={`/details/${params.detail_id}/episodes`}>Get Episods Summary</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center mt-10 gap-4 mx-2 md:mx-0'>
                        <h1 className='text-3xl self-start text-violet font-bold border-b-2 border-purple-500 p-[1px]'>Synopsis</h1>
                        <p className='text-white text-[20px] leading-[1.5] w-auto md:w-[55rem]'>
                            <ReadMore text={`${animeInfos.data.synopsis}`} maxLength={200} />
                        </p>
                    </div>

                    <div className='flex flex-col items-center gap-4 mx-2 mt-[100px] md:mx-0'>
                        <h1 className='text-3xl self-start text-violet font-bold border-b-2 border-purple-500 p-[1px]'>Trailer</h1>
                        {animeInfos.data.trailer.embed_url ? <iframe
                            src={animeInfos.data.trailer.embed_url}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={`${animeInfos.data.title}`}
                            allowFullScreen
                            height={450}
                            className='shadow w-auto rounded-[5px] md:w-[55rem] mx-0'
                        >

                        </iframe> : <p className='text-center text-red-700 text-3xl md:w-[55rem] mx-0'>Trailer not available ❌</p>}

                    </div>

                    <div className='flex flex-col items-center gap-5 mt-[100px]'>
                        <h1 className='text-3xl text-center font-bold w-[12rem] rounded-[5px] p-2 text-white title'>Characters</h1>
                        <div className='flex flex-wrap justify-center gap-5 mt-5 mb-5 w-auto mx-2 md:w-[50rem] mx-0'>
                            {(!characters.error && characters.data) ?
                                characters.data.map((element) => (
                                    <div className={`rounded-[5px] cursor-pointer flex flex-col gap-2 border border-transparent outline-none p-2 ${element.role === "Main" ? "main" : "support"} hover:translate-y-[-10px] duration-300`} key={nanoid(10)}>
                                        <p className={`font-semibold ${element.role === "Main" ? "text-red-600" : "text-white"}`}>{element.character.name}</p>
                                        <Link href={`/details/${params.detail_id}/pictures/${element.character.mal_id}`}>
                                            <img className='rounded-[5px] h-[25rem] w-[14rem] object-cover' src={`${element.character.images.webp.image_url}`} alt="" />
                                        </Link>
                                        <p className={`text-[20px] font-bold ${element.role === "Main" ? "text-red-600" : "text-white"}`}>{element.role}</p>
                                    </div>
                                )) :
                                <p className='text-center text-5xl text-red-700'>Characters not available</p>}

                        </div>
                    </div>

                </div>
            ) : (
                <h1 className='text-orange-600 text-4xl text-center mt-10'>Loading...</h1>
            )}
        </main>
    );
}
