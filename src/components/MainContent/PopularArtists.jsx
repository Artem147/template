import { useState, useEffect } from 'react';
import Artist from './Artist';

const key = '808fff1cd3cc4019d055549931a1fcfb'

export default function PopularArtists() {
    const [artists, setArtists] = useState([]);
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com///2.0/?method=chart.gettopartists&limit=6&api_key=${key}&format=json`)
        .then((response) => {
            return response.json();
        })
        .then((json)=>{
            const responseArtists = json['artists']['artist'];
            setArtists(responseArtists);
        })
    }, []);

    return (
        <div className="popular_artists">
            { artists.map((artist) => {
                return <Artist key={artist.url} artist={artist}/>
            }) }
        </div>
    )
}
