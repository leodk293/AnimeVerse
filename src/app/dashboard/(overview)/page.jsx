"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import './styles.css'

export default function Popular() {
    const [popular_anime, set_popular_anime] = useState({
        error: true,
        data: undefined
    });

    async function fetchPopularAnime() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
            const result = await response.json();
            console.log(result);

            set_popular_anime({
                error: false,
                data: result.data
            });
        } catch (error) {
            console.log(error.message);
            set_popular_anime({
                error: true,
                data: undefined
            });
        }
    }

    useEffect(() => {
        fetchPopularAnime();
    }, []);

    return (
        <div className='flex flex-col mt-10'>
            <h1 className='text-5xl font-bold text-center gradient-text md:text-left'>Popular Anime...</h1>
            <div className='flex flex-wrap justify-center gap-5 mt-9 mb-5 md:justify-start'>
                {(!popular_anime.error && popular_anime.data) ? (
                    popular_anime.data.map((anime) => (
                        <Link
                            className='border border-transparent p-1 rounded-[5px] bg-blue-950 hover:translate-y-[-5px] hover:bg-red-950 duration-300'
                            href={`/details/${anime.mal_id}`}
                            key={nanoid(10)}
                        >
                            <img className='object-cover rounded-[5px] h-[15rem] w-[10rem]' src={anime.images.jpg.image_url} alt={anime.title} />
                        </Link>
                    ))
                ) : (
                    <p className='text-orange-700 font-bold text-3xl'>Loading...</p>
                )}
            </div>
        </div>
    );
}
