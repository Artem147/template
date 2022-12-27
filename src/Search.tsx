import Footer from './components/Footer';
import Header from './components/Header';
import { useLocation} from 'react-router-dom';
import SearchContent from './components/Search/SearchContent';

function Search() {
  const {state} = useLocation();
  const { searchValue } = state;
  return (
    <>
        <Header/>

        <SearchContent search_value={searchValue}/>

        <Footer/>
    </>
  );
}

export default Search;
