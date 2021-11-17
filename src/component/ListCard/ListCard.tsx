// react
import { useCallback, useRef, useEffect, Dispatch, SetStateAction } from 'react';

// redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { FavoriteData, DataLoadType } from '../../action'

// type
import { CardData } from '../../types';

// utils
import { setStorage } from '../../util/storage';

// css
import './ListCard.css'

const ListCard = ({ Data, TargetCheck, setPage }: {Data: CardData, TargetCheck: boolean, setPage: Dispatch<SetStateAction<number>>}): JSX.Element => {

    const mySwal = require('sweetalert2');
    const TargetRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const getFavoriteData = useSelector((state: RootStateOrAny): {data: CardData[]} => state.FavoriteData);
    const setFavoriteData = (data: CardData[]): void => { 
        dispatch(FavoriteData(data));
        setStorage('FavoriteData', data);
    };
    const setDataLoadType = (type: string): void => { dispatch(DataLoadType(type)); }

    const onClickFavorite = useCallback(() => {
        if ( favoriteCheck() ) {
            setFavoriteData(getFavoriteData.data.filter((repo) => repo.id !== Data.id))
        } else {
            if ( getFavoriteData.data.length < 5 ) {
                setFavoriteData([...getFavoriteData.data, Data]);
            } else {
                mySwal.fire({icon: 'error', title: '실패', html: '관심 레포지토리는 5개까지 추가할 수 있습니다'});
            }
        }
    }, [getFavoriteData]); // eslint-disable-line react-hooks/exhaustive-deps

    const favoriteCheck = useCallback(() => {
        let flag = false;
        getFavoriteData.data.forEach(repo => {
            if ( repo.id === Data.id ) flag = true;
        });
        return flag;
    }, [getFavoriteData]); // eslint-disable-line react-hooks/exhaustive-deps

    
    const handleObserver = useCallback((entries, observer) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setDataLoadType('scroll');
            observer.unobserve(target.target)
            setPage((page: number) => page + 1);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        const option = { rootMargin: "0px", threshold: 0 };
        const observer = new IntersectionObserver(handleObserver, option);
        if (TargetRef.current) observer.observe(TargetRef.current);
    }, [handleObserver]);
    
    return (
        <div className='listCard' ref={TargetCheck ? TargetRef : null} >
            <div className='button' onClick={onClickFavorite} >
                { 
                    favoriteCheck()
                    ?   <img src='/img/favorite.png' alt='favorite' />
                    :   <img src='/img/not_favorite.png' alt='not_favorite' />
                }
            </div>
            <a href={Data.html_url} target='_blank' rel='noopener noreferrer'>{Data.full_name}</a>
            <p>{Data.description}</p>
            <div>
                <span>{Data.language !== null ? Data.language : 'None'}</span>
                <span><i className="far fa-star"></i><span>{(Data.stargazers_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></span>
                <span><i className="fas fa-code-branch"></i><span>{(Data.forks_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></span>
            </div>
        </div>
    )
    
}

export default ListCard;