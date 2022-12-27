import { useState, useEffect } from 'react';

const key = '808fff1cd3cc4019d055549931a1fcfb'


export default function SearchAlbums({track_name}) {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com///2.0/?method=track.search&track=${track_name}&limit=10&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
            const responseTracks = json['results']['trackmatches']['track']
            setTracks(responseTracks);
        })
    }, []);

    return (
        <div className="search-tracks">
            { tracks.map((track) => {
                return (
                        <a key={track.url} className="search-track" href={track.url}>
                            <div className="search-track-cover"></div>
                            <div className="search-track-name">{track.name}</div>
                            <div className="search-track-author">{track.artist}</div>
                        </a>)
            }) }
        </div>

    )
}
