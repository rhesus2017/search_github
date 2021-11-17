// react
import { useEffect } from 'react'

// component
import SearchInput from '../../component/SearchInput/SearchInput';
import SearchList from '../../component/SearchList/SearchList';
import FavoriteList from '../../component/FavoriteList/FavoriteList';

// util
import { setStorage, getStorage } from '../../util/storage';

// css
import './SearchResult.css';

const SearchResult = (): JSX.Element => {

    useEffect(() => {
        setStorage('PrevPage', 'searchResultPage');
    }, []);

    return (
        <div className='searchResult'>
            <SearchInput />
            <div className={`searchResultWrap ${getStorage('PrevPage')}`}>
                <SearchList />
                <FavoriteList />
            </div>
        </div>
    )
    
}

export default SearchResult;