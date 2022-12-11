const key = '808fff1cd3cc4019d055549931a1fcfb'
const headerLogo = document.querySelector('.header_logo');


createMainContent()

headerLogo.addEventListener('click', function() {
    createMainContent()
})

function createMainContent(){
    const mainContent = document.querySelector('.content');
    mainContent.innerHTML = '';
    const artistList = getPopularArtist();
    const trackList  = getPopularTracks();


    const artist_title_h2 = createEl('h2', "content_title")
    const track_title_h2 = createEl('h2', "content_title")
    const separator1 = createEl('hr', 'separator')
    const separator2 = createEl('hr', 'separator')
    artist_title_h2.append('popular artists')
    track_title_h2.append('popular tracks')

    mainContent.append(artist_title_h2)
    mainContent.append(separator1)
    mainContent.append(artistList)

    mainContent.append(track_title_h2)
    mainContent.append(separator2)
    mainContent.append(trackList)

}

function getPopularArtist(){
    const artistList = createEl('div', 'popular_artists');
    fetch(`https://ws.audioscrobbler.com///2.0/?method=chart.gettopartists&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        const artists = json['artists']['artist']
        artists.slice(0, 6).forEach((artist) => {
            const artist_div = createEl('div', 'artist')
            const atrist_img_div = createEl('div', 'artist-image')
            const artist_name_div = createEl('div', 'artist-name')
            const artist_url_a = createEl('a', "artist_url")
            artist_url_a.href = artist.url
            artist_url_a.append(artist.name)
            const artist_tag_div = createEl('div', 'artist-tag')

            getTagNames(artist.name)
            .then((tag_names)=>{
                artist_tag_div.append(tag_names)

                artist_name_div.append(artist_url_a)
                artist_div.append(atrist_img_div)
                artist_div.append(artist_name_div)
                artist_div.append(artist_tag_div)

                artistList.append(artist_div)
            })
        })
    })
    return artistList
}

/*`
        <div class="artist">
            <div class="artist-image"></div>
            <div class="artist-name">
                <a href='${artist.url}'>${artist.name}</a>
            </div>
            <div class="artist-tag">rnb,electronic,canadian</div>
        </div>`
*/

function getPopularTracks(){
    const trackList = createEl('div', 'popular_tracks');
    fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        const tracks = json['tracks']['track']
        tracks.slice(0, 10).forEach((track) => {
            const track_div = createEl('div', 'track')
            const track_img_div = createEl('div', 'track-img')
            const track_description_div = createEl('div', 'track-description')
            const track_name_div = createEl('div', 'track-name')
            const track_url_a = createEl('a', "track_url")
            track_url_a.href = track.url
            track_url_a.append(track.name)
            const track_author_div = createEl('div', "track-author")
            track_author_div.append(track.artist.name)


            track_name_div.append(track_url_a)
            track_description_div.append(track_name_div)
            track_description_div.append(track_author_div)
            track_div.append(track_img_div)
            track_div.append(track_description_div)

            trackList.append(track_div)
        });
    })
    return trackList
}



/*
`<div class="track">
        <div class="track">
            <div class="track-img"></div>
            <div class="track-description">
                <div class="track-name">
                    <a class= "track_url" href='${track.url}'>${track.name}</a>
                </div>
                <div class="track-author">${track.artist.name}</div>
            </div>
        </div>
    </div>`
        trackList.insertAdjacentHTML('beforeend', element)
*/

function createEl(tag, class_name) {
    const element = document.createElement(tag)
    element.className = class_name
    return element
}

function getTagNames(artist_name){
    return fetch(`https://ws.audioscrobbler.com///2.0/?method=artist.gettoptags&artist=${artist_name}&api_key=${key}&format=json`)
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
        return tag_names.join(',')
    })
}

function appendItems(){

}


const searchForm = document.querySelector('.header__input');

searchForm.addEventListener('keydown', function(event) {
    if (event.code == 'Enter'){
        const searchText = searchForm.value;
        const mainContent = document.querySelector('.content');
        mainContent.innerHTML = '';

        search_title = createEl('h1', 'search-title')
        search_title.append(`Search results for ${searchText}`)

        const search_artists_title = createEl('h2', 'search_title')
        search_artists_title.append('Artists')
        const artistSearch = makeArtistSearch(searchText)
        const search_albums_title = createEl('h2', 'search_title')
        search_albums_title.append('Albums')
        const albumSearch = makeAlbumSearch(searchText)
        const search_tracks_title = createEl('h2', 'search_title')
        search_tracks_title.append('Tracks')
        const trackSearch = makeTrackSearch(searchText)

        mainContent.append(search_title)
        mainContent.append(search_artists_title)
        mainContent.append(artistSearch)
        mainContent.append(search_albums_title)
        mainContent.append(albumSearch)
        mainContent.append(search_tracks_title)
        mainContent.append(trackSearch)

        searchForm.value = ''
    }
})

/*
    <div class="search-artist">
        <div class="search-artist-name">80's greatest hits</div>
    </div>
*/

function makeArtistSearch(artist_name){
    const artistSearch = createEl('div', 'search-artists')
    fetch(`https://ws.audioscrobbler.com///2.0/?method=artist.search&artist='${artist_name}'&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        const artists = json['results']['artistmatches']['artist']
        artists.slice(0, 5).forEach((artist) => {
            const search_artist_div = createEl('a', 'search-artist')
            search_artist_div.href = artist.url
            const search_artist_name_div = createEl('div', 'search-artist-name')
            search_artist_name_div.append(artist.name)
            search_artist_div.append(search_artist_name_div)

            artistSearch.append(search_artist_div)

        })
    })
    return artistSearch
}

/*
    <div class="search-album">
        <div class="search-album-name">Greatest hits</div>
        <div class="search-album-author">the Cure</div>
    </div>
*/

function makeAlbumSearch(album_name){
    const albumSearch = createEl('div', 'search-albums')
    fetch(`https://ws.audioscrobbler.com///2.0/?method=album.search&album=${album_name}&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        const albums = json['results']['albummatches']['album']
        albums.slice(0, 5).forEach((album) => {
            const search_album_div = createEl('a', 'search-album')
            search_album_div.href = album.url
            const search_album_name_div = createEl('div', 'search-album-name')
            const search_album_author_div = createEl('div', 'search-album-author')
            search_album_name_div.append(album.name)
            search_album_author_div.append(album.artist)
            search_album_div.append(search_album_name_div)
            search_album_div.append(search_album_author_div)

            albumSearch.append(search_album_div)

        })
    })
    return albumSearch

}


/*
    <div class="search-track">
        <div class="search-track-cover"></div>
        <div class="search-track-name">Трек 5</div>
        <div class="search-track-author">Исполнитель 5</div>
    </div>
*/
function makeTrackSearch(track_name){
    const trackSearch = createEl('div', 'search-tracks')
    fetch(`https://ws.audioscrobbler.com///2.0/?method=track.search&track=${track_name}&api_key=${key}&format=json`)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        const tracks = json['results']['trackmatches']['track']
        tracks.slice(0, 8).forEach((track) => {
            const search_track_div = createEl('a', 'search-track')
            search_track_div.href = track.url
            const search_track_cover_div = createEl('div', 'search-track-cover')
            const search_track_name_div = createEl('div', 'search-track-name')
            const search_track_author_div = createEl('div', 'search-track-author')
            search_track_name_div.append(track.name)
            search_track_author_div.append(track.artist)
            search_track_div.append(search_track_cover_div)
            search_track_div.append(search_track_name_div)
            search_track_div.append(search_track_author_div)

            trackSearch.append(search_track_div)
        })
    })
    return trackSearch
}
