import React from 'react';
import Image from 'next/image';
import './styles.css'

const ImageScroller = ({ images }) => {
  return (
    <div className="overflow-hidden relative">
      <div className="flex w-full animate-scroll">
        {images.map((src, index) => (
          <div key={index} className="w-1/4 flex-shrink-0">
            <Image
              src={src}
              alt={`Image ${index}`}
              layout="responsive"
              className='rounded-[50%] w-[20rem] h-[20rem] object-cover border border-transparent p-2'
            />
          </div>
        ))}
        {images.map((src, index) => (
          <div key={`copy-${index}`} className="w-1/4 flex-shrink-0">
            <Image
              src={src}
              alt={`Image ${index}`}
              layout="responsive"
              className='rounded-[50%] w-[20rem] h-[20rem] object-cover border border-transparent p-2'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
