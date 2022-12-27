import { useState, useEffect } from 'react';

const key = '808fff1cd3cc4019d055549931a1fcfb'


export default function SearchArtists({artist_name}) {
    const [artists, setArtists] = useState([]);
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com///2.0/?method=artist.search&artist='${artist_name}'&limit=5&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
            const responseArtists = json['results']['artistmatches']['artist']
            setArtists(responseArtists);
        })
    }, []);

    return (
        <div className="search-artists">
            { artists.map((artist) => {
                return (
                        <a key = {artist.url} className="search-artist" href={artist.url}>
                            <div className="search-artist-name">
                                {artist.name}
                            </div>
                        </a>)
            }) }
        </div>

    )
}
