// react 
import { KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { SearchWord, ResetSearchData, DataLoadType } from '../../action';

// css
import './SearchInput.css';
import { getStorage, setStorage } from '../../util/storage';

const SearchInput = (): JSX.Element => {

    const mySwal = require('sweetalert2');
    const history = useHistory();
    const InputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const getSearchWord = useSelector((state: RootStateOrAny): {word: string} => state.SearchWord);
    const setSearchWord = (word: string): void => { 
        dispatch(SearchWord(word));
        setStorage('SearchWord', word);
    }
    const setResetSearchData = (): void => { dispatch(ResetSearchData()); }
    const setDataLoadType = (type: string): void => { dispatch(DataLoadType(type)); }

    useEffect(() => {
        if ( !InputRef.current ) { return };
        if ( history.location.pathname === '/SearchResult' ) {
            InputRef.current.value = getSearchWord.word;
        } else if ( history.location.pathname === '/Issues' ) {
            InputRef.current.value = getSearchWord.word;
        } else if ( history.location.pathname === '/' ) {
        InputRef.current.value = ''
        }
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSearch = useCallback(() => {
        if ( !InputRef.current ) { return };
        if ( InputRef.current.value === '' ) {
            mySwal.fire({icon: 'error', title: '실패', html: '검색어를 입력해주세요'});
        } else {
            setDataLoadType('click');
            setResetSearchData();
            setSearchWord(InputRef.current.value);
            if ( history.location.pathname === '/' || history.location.pathname === '/Issues' ) history.push('/SearchResult');
        }
    }, [InputRef]); // eslint-disable-line react-hooks/exhaustive-deps

    const onPressEnter = (event:KeyboardEvent<HTMLInputElement>): void => {
        if ( event.key === 'Enter' ) {
            onSearch();
        }
    }
    
    return (
        <div className={`searchInput ${getStorage('PrevPage') ?  getStorage('PrevPage') : 'homePage'}`}>
            <Link to='/'>
                <img src='/img/git_logo_02.png' alt='GitHub' className='logo_02' />
                <img src='/img/git_logo_04.png' alt='GitHub' className='logo_04' />
            </Link>
            <div className='inputBox'>
                <input type='text' ref={InputRef} onKeyPress={onPressEnter} />
                <button type='button' onClick={onSearch}><i className="fas fa-search"></i></button>
            </div>
            <p>레포지토리를 검색하고 관심 레포지토리의 최신 이슈를 한눈에 살펴보세요</p>
        </div>
    )
}

export default SearchInput;