import Image from 'next/image';
import Link from 'next/link';
import Footer from './footer/Footer';
import ImageScroller from './carousel/carousel';
import logo from './logo.jpg'

export default function Home() {
  const images = [
    'https://w0.peakpx.com/wallpaper/713/513/HD-wallpaper-attack-on-titan-eren-yeager.jpg',
    'https://w0.peakpx.com/wallpaper/145/1001/HD-wallpaper-hollow-ichigo-anime-bleach.jpg',
    'https://w0.peakpx.com/wallpaper/616/347/HD-wallpaper-demon-slayer.jpg',
    'https://w0.peakpx.com/wallpaper/599/734/HD-wallpaper-one-piece-one-piece-anime.jpg',
    'https://w0.peakpx.com/wallpaper/764/443/HD-wallpaper-goku-magic-cloud-dragon-ball-dragon-ball-z-son-goku.jpg'
  ];

  return (
    <>
      <section className="border border-transparent py-2 bg-[#44444442] flex flex-wrap gap-7 justify-center shadow">
        <h1 className="text-center font-bold self-center text-white text-5xl">The AnimeVerse</h1>
        <div className='flex flex-col gap-0 items-center border border-transparent p-2'>
          <Image className='w-[7rem] rounded-[50%] object-cover p-2' src={logo} />
          <p className='text-red-500 font-extrabold'>AnimeVerse</p>
        </div>
      </section>
      <div className="flex flex-col gap-5 items-center mt-[100px]">
        <h1 className="text-4xl text-center text-yellow-600 font-bold">Welcome to AnimeVerse !!!</h1>
        <p className="w-auto mx-2 text-center text-[20px] leading-[1.7] mt-10 md:w-[30rem] mx-0 text-zinc-300">
          AnimeVerse is the best to know about anime airing, upcoming or the most popular.
        </p>
        <div className='hidden md:block'>
          <ImageScroller images={images} />
        </div>
        <p className="w-auto mx-2 text-center leading-[1.5] text-[20px] md:w-[45rem] mx-0 text-zinc-300">
          Dive into the exciting world of AnimeVerse, your ultimate destination for all things anime. Whether
          you&apos;re a seasoned otaku or new to the anime scene, AnimeVerse has something special for you.
        </p>
        <p className='text-center text-3xl text-orange-700 font-bold'>Ready ?</p>

        <Link className="text-black font-bold text-[20px] no-underline" href={'/dashboard'}>
          <button className="border border-transparent bg-white cursor-pointer py-2 px-5 rounded-[5px] shadow hover:translate-x-[10px] duration-300 hover:bg-[#878787] duration-500">
            Dive into the World of anime
          </button>
        </Link>

      </div>

      <Footer />
    </>
  );
}
