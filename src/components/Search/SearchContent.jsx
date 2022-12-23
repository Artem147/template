import SearchArtists from './SearchArtists';
import SearchTracks from './SearchTracks';
import SearchAlbums from './SearchAlbums';

export default function({search_value}) {
    return (
            <main className="content">
                <h2 className="search_title">Artists</h2>
                <SearchArtists artist_name={search_value}/>

                <h2 className="search_title">Albums</h2>
                <SearchAlbums album_name={search_value}/>

                <h2 className="search_title">Tracks</h2>
                <SearchTracks track_name={search_value}/>
            </main>
        )
}