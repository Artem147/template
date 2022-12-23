import PopularArtists from './PopularArtists';
import PopularTracks from './PopularTracks';

export default function() {
    return (
            <main className="content">
                <h2 className="content_title">popular artists</h2>
                <hr className='separator'/>
                <PopularArtists />

                <h2 className="content_title">popular tracks</h2>
                <hr className='separator'/>
                <PopularTracks />
            </main>
        )
}