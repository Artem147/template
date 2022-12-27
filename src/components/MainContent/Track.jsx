const key = '808fff1cd3cc4019d055549931a1fcfb'

export default function Track({ track }) {
    return(
        <div className="track">
            <div className="track-img"></div>
            <div className="track-description">
                <div className="track-name">
                    <a href={ track.url }> { track.name } </a>
                </div>
                <div className="track-author">{track.artist.name}</div>
            </div>
        </div>
    )
}