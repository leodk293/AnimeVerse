"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import narutoImage from './naruto.png'
import logo from './logo.jpg'
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
    const pathname = usePathname();
    const style = {
        backgroundImage: 'linear-gradient(to bottom, white, yellow)'
    };


    return (
        <main className='flex flex-col md:flex-row gap-5 w-full'>
            <section className='flex flex-col border border-black bg-black shadow p-5 w-full md:w-[20rem] md:fixed h-auto md:h-[47rem] gap-5 md:gap-[30px]'>
                <div className='flex flex-wrap justify-center gap-2'>
                    <Link className='self-center' href={'/'}>
                        <h1 className='text-3xl text-center text-purple-500 font-bold'>AnimeVerse</h1>
                    </Link>
                    <Image className='w-[5rem] rounded-[50%] object-cover p-2' src={logo} />
                </div>
                <Link className={`${pathname === '/dashboard' ? 'text-black bg-white font-semibold' : 'text-zinc-400 text-xl w-full p-3 font-semibold hover:bg-[#f1f1f1] hover:text-black duration-500'} w-full p-3 rounded-[20px]`} href={'/dashboard'}>Popular</Link>
                <Link className={`${pathname === '/dashboard/airing' ? 'text-black bg-white font-semibold' : 'text-zinc-400 text-xl w-full p-3 font-semibold hover:bg-[#f1f1f1] hover:text-black duration-500'} w-full p-3 rounded-[20px]`} href={'/dashboard/airing'}>Airing</Link>
                <Link className={`${pathname === '/dashboard/upcoming' ? 'text-black bg-white font-semibold' : 'text-zinc-400 text-xl w-full p-3 font-semibold hover:bg-[#f1f1f1] hover:text-black duration-500'} w-full p-3 rounded-[20px]`} href={'/dashboard/upcoming'}>Upcoming</Link>
                <div className='flex flex-row gap-2'>
                    <div className='w-[10rem] h-[1px] self-center  bg-white rounded-[10px]'></div>
                    <p className='text-white font-bold text-2xl'>or</p>
                    <div className='w-[10rem] h-[1px] self-center  bg-white rounded-[10px]'></div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white translate-y-[20px]'>Search for an anime here...</p>
                    <Link className={`${pathname === '/dashboard/search' ? 'text-[#f1f1f1] text-xl text-center border border-transparent rounded-[20px] py-2 bg-blue-950 w-full mt-10 font-semibold' : 'font-semibold text-xl text-center border border-transparent rounded-[20px] py-2 bg-white w-full mt-10 hover:translate-x-[10px] duration-300'}`} href={'/dashboard/search'}>Search</Link>
                </div>
                <div style={style} className='border bg-white border-transparent p-5 w-[200px] self-center rounded-[50%] hidden md:block'>
                    <Image className='self-center w-[100px] object-cover' src={narutoImage} alt='NARUTO' />
                </div>
            </section>

            <div className='ml-0 md:ml-[30%]'>
                {children}
            </div>

        </main>
    )
}
