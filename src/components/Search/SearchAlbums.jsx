import { useState, useEffect } from 'react';

const key = '808fff1cd3cc4019d055549931a1fcfb'


export default function SearchAlbums({album_name}) {
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com///2.0/?method=album.search&album=${album_name}&limit=5&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
            const responseAlbums = json['results']['albummatches']['album']
            setAlbums(responseAlbums);
        })
    }, []);

    return (
        <div className="search-albums">
            { albums.map((album) => {
                return (
                        <a key={album.url} className="search-album" href={album.url}>
                            <div className="search-album-name">{album.name}</div>
                            <div className="search-album-author">{album.artist}</div>
                        </a>)
            }) }
        </div>

    )
}
