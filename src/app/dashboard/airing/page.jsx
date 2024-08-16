"use client";
import React from 'react'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import './styles.css'
import Image from 'next/image';

export default function Page() {
    const [anime_airing, set_anime_airing] = useState({
        error: true,
        data: undefined
    })

    async function fetchAiringAnime() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing");
            const result = await response.json();
            console.log(result);

            set_anime_airing({
                error: false,
                data: result.data
            })

        }
        catch (error) {
            console.log(error.message)
            set_anime_airing({
                error: true,
                data: undefined
            })
        }
    }

    useEffect(() => {
        fetchAiringAnime();
    }, [])

    return (
        <div className='flex flex-col mt-10'>
            <h1 className='text-5xl font-bold text-center gradient-text md:text-left'>Anime On Air...</h1>
            <div className='flex flex-wrap justify-center gap-5 mt-9 mb-5 md:justify-start'>
                {(anime_airing.error === false && anime_airing.data) ? (
                    anime_airing.data.map((anime) => (
                        <Link className='border border-transparent p-1 rounded-[5px] bg-blue-950 hover:translate-y-[-5px] duration-300 hover:bg-red-950 duration-300'
                            href={`/details/${anime.mal_id}`} key={nanoid(10)}>
                            <Image className='object-cover rounded-[5px] h-[15rem] w-[10rem]' src={anime.images.jpg.image_url} alt={anime.title} />
                        </Link>
                    ))
                ) : (
                    <p className='text-orange-700 font-bold text-3xl'>Loading...</p>
                )}
            </div>

        </div>
    )
}
