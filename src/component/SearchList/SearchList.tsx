// react 
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from "react-loading";

// redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { SearchData, ResetSearchData } from '../../action';

// component
import ListCard from '../ListCard/ListCard'

// type
import { CardData } from '../../types';

// css
import './SearchList.css'


const SearchList = (): JSX.Element => {

    const mySwal = require('sweetalert2');
    const dispatch = useDispatch();
    const [ Page, setPage ] = useState<number>(1);
    const [ Loading, setLoading ] = useState<string>('none');
    const [ FadeIn, setFadeIn ] = useState<boolean>(false);
    const getSearchDatas = useSelector((state: RootStateOrAny): { data: CardData[], total_count: number } => state.SearchData);
    const getSearchWord = useSelector((state: RootStateOrAny): { word: string } => state.SearchWord);
    const getDataLoadType = useSelector((state: RootStateOrAny): { type: string } => state.DataLoadType)
    const setSearchData = (data: CardData[]): void => { dispatch(SearchData(data)); }
    const setResetSearchData = (): void => { dispatch(ResetSearchData()); }

    useEffect(() => {
        setResetSearchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSearchDataInState();
    }, [getSearchWord, Page]); // eslint-disable-line react-hooks/exhaustive-deps

    const setSearchDataInState = useCallback(async(): Promise<void> => {
        if ( getSearchWord.word !== '' ) {
            if (getDataLoadType.type === 'click') {
                setFadeIn(false);
                setLoading('all');
            } else if (getDataLoadType.type === 'scroll') {
                setLoading('half');
            }
            try {
                const response = await axios({
                    url: `https://api.github.com/search/repositories?q=${getSearchWord.word}&per_page=28&page=${Page}`,
                    method:'GET'
                });
                setSearchData(response['data']);
                setLoading('none');
                if (getDataLoadType.type === 'click') setFadeIn(true);
            } catch(error) {
                mySwal.fire({icon: 'error', title: '실패', html: '알 수 없는 문제로 검색결과 가져오기에 실패했습니다'});
            }
        };
    }, [getSearchWord, Page]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div className='searchList'>
            <div className={`loading ${Loading}`}>
                <ReactLoading type="spin" color="#478bff" />
            </div>
            <p>총 {(getSearchDatas.total_count)?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}개의 데이터가 있습니다</p>
            <div className={`searchListWrap ${FadeIn}`}>
                {   
                    
                    getSearchDatas.total_count !== 0
                    ? (getSearchDatas.data).map((Data, index) => {
                        const lastCard = getSearchDatas.data.length === index + 1;
                        return ( 
                            <ListCard key={index} Data={Data} TargetCheck={lastCard} setPage={setPage} /> 
                        ) 
                    } )
                    : <div className='nonData'>검색결과가 존재하지 않습니다</div>
                }
            </div>
        </div>
    )           
};

export default SearchList;