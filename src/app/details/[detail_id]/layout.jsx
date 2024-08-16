import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({ params }, parent) {
    const id = params.detail_id;

    const product = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const result = await product.json();

    return {
        title: result.data.title,
        description: `${result.data.title} informations are diaplayed here`,
    };
}

export default function layout({ children }) {
    return (
        <div>{children}</div>
    )
}
