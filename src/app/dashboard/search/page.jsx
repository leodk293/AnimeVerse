"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { nanoid } from 'nanoid';


export default function page() {
    const [animeData, setAnimeData] = useState({
        error: true,
        data: undefined
    })
    const inputRef = useRef();

    async function fetchAnimeData() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${inputRef.current.value}&order_by=popularity&sort=asc&sfw`);
            const result = await response.json();
            console.log(result);

            setAnimeData({
                error: false,
                data: result.data
            })

        }
        catch (error) {
            console.log(error.message);
            setAnimeData({
                error: true,
                data: undefined
            })
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetchAnimeData();
    }

    return (
        <div className='flex flex-col gap-5 mt-10'>
            <h1 className='text-5xl font-bold text-purple-400 text-center md:text-left'>Search An Anime...</h1>
            <form className='mt-[20px]' onSubmit={handleSubmit}>
                <input className='outline-none p-1 text-white text-[20px] w-auto mx-2 bg-transparent border-b border-white md:w-[40rem] mx-0' ref={inputRef} type="text" placeholder='Enter an anime name here...' />
            </form>
            <div className='flex flex-wrap justify-center gap-5 mt-9 mb-5 md:justify-start'>
                {(animeData.error === false && animeData.data) ? (
                    animeData.data.map((anime) => (
                        <Link className='border border-transparent p-1 rounded-[5px] bg-blue-950 hover:translate-y-[-5px] duration-300 hover:bg-red-950 duration-300'
                            href={`/details/${anime.mal_id}`} key={nanoid(10)}>
                            <img className='object-cover rounded-[5px] h-[15rem] w-[10rem]' src={anime.images.jpg.image_url} alt={anime.title} />
                        </Link>
                    ))
                ) : (
                    <p className='text-orange-700 font-bold text-3xl'>Waiting...</p>
                )}
            </div>

        </div>
    )
}
