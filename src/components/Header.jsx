import { useNavigate } from "react-router-dom";
import searchLogo from '../searchLogo.png'

export default function Header() {
    const navigate = useNavigate();


    const onKeyPress = event => {
        const code = event.keyCode || event.which;
        if(code === 13) {
            if (event.target.value === '') {
                alert('Введите параметры поиска')
            }
            else {
                navigate("/search", { state: { searchValue: event.target.value } });
            }
        }
    }

    return (
        <header className="header">
            <div className="header_icon">
                <img src="https://laylio.radioactive.sg/public/1d205655ef29e14a8255c89fe2383a41.jpg" width="60px" height="60px"/>
            </div>
            <div className="header_logo">
                <a className="header_link" href="/">last.fm</a>
            </div>
            <div className="header_search">
                <input className="header_search_field header__input" type="searcher" placeholder="search music..." onKeyPress={onKeyPress}/>
                <img className="header_search_logo" src={searchLogo} width="45px" height="45px"/>
            </div>
        </header>
    )
}