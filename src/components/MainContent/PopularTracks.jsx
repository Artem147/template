
import { useState, useEffect } from 'react';
import Track from './Track';

const key = '808fff1cd3cc4019d055549931a1fcfb'

export default function PopularTracks() {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=${key}&format=json`)
        .then((response) => {
            return response.json();
        })
        .then((json)=>{
            const responseTracks = json['tracks']['track'];
            setTracks(responseTracks);
        })
    }, []);
    return(
        <div className="popular_tracks">
            { tracks.map((track) => {
                return <Track key={track.url} track={track}/>
            }) }
        </div>
    )
}