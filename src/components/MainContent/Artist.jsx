import { useState, useEffect } from 'react';

const key = '808fff1cd3cc4019d055549931a1fcfb'

export default function Artist({ artist }) {
    const [tag, setTag] = useState('');
    useEffect(() => {
            fetch(`https://ws.audioscrobbler.com///2.0/?method=artist.gettoptags&artist=${artist.name}&api_key=${key}&format=json`)
            .then((response) => {
                return response.json();
            })
            .then((json)=>{
                const tag_names = []
                const tags = json['toptags']['tag']
                tags.slice(0, 3).forEach((tag) => {
                    tag_names.push(tag.name)
                })
                return tag_names
            })
            .then((tag_names) => {
                setTag(tag_names.join(','))
            })
        }, [artist]
    )

    return(
        <div className="artist">
        <div className="artist-image"></div>
        <div className="artist-name">
            <a href={ artist.url }> { artist.name } </a>
        </div>
        <div className="artist-tag"> { tag } </div>
    </div>
    )
}