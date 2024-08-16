import React from 'react'

export default function Footer() {
    const date = new Date();
    return (
        <footer className='flex flex-col items-center gap-5 mb-5 mt-[10rem]'>
            <div className='w-[22rem] mx-10 h-[1px] bg-white md:w-[80rem] mx-0'></div>
            <p className='text-center text-white'>© {date.getFullYear()} <span className='font-bold'>AnimeVerse</span>. All rights reserved.</p>
        </footer>
    )
}
