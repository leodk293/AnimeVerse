import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({ params }, parent) {
    const id = params.picture_id;

    const product = await fetch(`https://api.jikan.moe/v4/characters/${params.picture_id}/full`);
    const result = await product.json();

    return {
        title: `${result.data.name} Infos`,
        description: `${result.data.name} Infos are displayed here .`,
    };
}

export default function layout({ children }) {
    return (
        <div>{children}</div>
    )
}
