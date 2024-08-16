"use client";
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import ReadMore from '../../readMore';

export default function Page({ params }) {
    const [pictures, setPictures] = useState({
        error: true,
        data: undefined
    });
    const [voiceActors, setVoiceActors] = useState(undefined);
    const [charactersInfos, setCharactersInfos] = useState({
        name: undefined,
        story: undefined,
        voices: []
    })

    const [mainImage, setMainImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    async function fetchPictures() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${params.picture_id}/pictures`);
            const result = await response.json();
            console.log(result);

            setPictures({
                error: false,
                data: result.data
            });
            setMainImage(result.data[0].jpg.image_url);
            setSelectedImageIndex(0);
        }
        catch (error) {
            console.log(error.message);
            setPictures({
                error: true,
                data: undefined
            });
        }
    }

    /*async function fetchCharacterVoiceActors() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${params.picture_id}/voices`);
            const result = await response.json();
            setVoiceActors(result.data);
        }
        catch (error) {
            console.log(error.message);
            setVoiceActors(undefined);
        }
    }*/

    async function fetchChrtsInfos() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${params.picture_id}/full`);
            const result = await response.json();
            setCharactersInfos({
                name: result.data.name,
                story: result.data.about,
                voices: result.data.voices
            })
        }
        catch (error) {
            console.log(error.message);
            setCharactersInfos({
                name: undefined,
                story: undefined,
                voices: []
            })
        }

    }

    useEffect(() => {
        fetchPictures();
        fetchChrtsInfos();

    }, [params.picture_id]);

    const handleClick = (imageUrl, index) => {
        setMainImage(imageUrl);
        setSelectedImageIndex(index + 1);
    }

    return (
        <main className='mt-10 mb-5'>

            <Link href={'/dashboard'}>
                <button className='border border-transparent rounded-[5px] text-[20px] bg-orange-800 text-white px-3 py-2 ml-10 hover:translate-x-[-10px] duration-300'>
                    🔙 Go Back
                </button>
            </Link>

            {(pictures.error === false && pictures.data) ? (
                <div className='flex flex-col items-center gap-5 mt-5'>
                    {charactersInfos.name ? <h1 className='text-5xl text-center font-semibold text-yellow-500'>✨ {charactersInfos.name} ✨</h1> : null}
                    <div className='flex flex-col items-center gap-5'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-3xl text-center mt-[100px] text-[#dfdfdf] leading-10 font-bold underline underline-offset-8'>Voice Actors 🎬</h1>

                            <div className='flex flex-wrap justify-center gap-10 mt-10'>
                                {charactersInfos.voices ? (
                                    charactersInfos.voices.slice(0, 4).map((actor) => (
                                        <div className='flex flex-col gap-5' key={nanoid(10)}>
                                            <p className='text-[20px] text-white'>Language : {actor.language}</p>
                                            <div className='border border-transparent bg-yellow-200 p-[1px] rounded-[5px] cursor-pointer hover:scale-[105%] duration-500'>
                                                <img className='w-[15rem] h-[20rem] object-cover rounded-[5px]' src={`${actor.person.images.jpg.image_url}`} alt={`${actor.person.name}`} />
                                            </div>
                                            <p className='text-2xl text-orange-800'>{actor.person.name}</p>
                                        </div>
                                    ))
                                ) : <p className='text-center text-xl text-red-700'>Loading...</p>}
                            </div>

                        </div>
                        <h1 className='translate-y-20 text-center leading-10 underline text-3xl underline-offset-8 text-orange-500'>About : ⚔️ {charactersInfos.name} ⚔️</h1>
                        <div className='flex flex-wrap justify-center gap-5 text-white leading-8 border border-transparent bg-[#8f8f8f23] px-5 pb-10 rounded-[10px] shadow'>
                            <div className='w-[20rem] h-[410px] border border-transparent p-1 bg-orange-900 rounded-[5px] mt-[100px]'>
                                <img className='w-[20rem] h-[400px] rounded-[5px] object-cover' alt='PICTURE' src={mainImage} />
                            </div>
                            <div className='self-center mt-0 text-[17px] overflow-y-scroll overflow-hidden outline-none hide-scrollbar h-[410px] w-auto mx-5 md:w-[40rem] mt-[6rem] mx-0'>
                                {charactersInfos.story ? <ReadMore text={charactersInfos.story} maxLength={650} /> : null}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-center w-auto mx-3 gap-5 mt-[100px] md:w-[80rem] mx-0'>
                        {
                            pictures.data.slice(1, pictures.data.length).map((element, index) => (
                                <img
                                    className={`w-[14rem] h-[20rem] object-cover shadow rounded-[5px] border border-transparent bg-white p-1 cursor-pointer hover:brightness-50 ${selectedImageIndex === index + 1 ? 'bg-yellow-500' : ''}`}
                                    key={nanoid(10)}
                                    alt='PICTURE'
                                    src={`${element.jpg.image_url}`}
                                    onClick={() => handleClick(element.jpg.image_url, index)}
                                />
                            ))
                        }
                    </div>
                </div>
            ) : <p className='text-center text-orange-500 text-3xl'>Loading...</p>}
        </main>
    )
}
