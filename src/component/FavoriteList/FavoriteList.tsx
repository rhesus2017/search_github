// react
import { SetStateAction } from 'react';
import { Link, useHistory } from 'react-router-dom';

// redux
import { RootStateOrAny, useSelector } from 'react-redux';

// component
import ListCard from '../ListCard/ListCard'

// type
import { CardData } from '../../types';

// css
import './FavoriteList.css'


const FavoriteList = (): JSX.Element => {

    const history = useHistory();
    const getFavoriteData = useSelector((state: RootStateOrAny): {data: CardData[]} => state.FavoriteData);
    
    return (
        <div className='favoriteList'>
            {   
                history.location.pathname === '/SearchResult'
                ? <Link to='/Issues'>관심 레포지토리 최신 이슈 보러가기</Link>
                : <Link to='/SearchResult'>레포지토리 검색 하러가기</Link>
            }
            
            <div className='favoriteListWrap'>
                {
                    getFavoriteData.data.length !== 0
                    ? getFavoriteData.data.map((Data, index) => <ListCard key={index} Data={Data} TargetCheck={false} setPage={function (value: SetStateAction<number>): void {
                        throw new Error('Function not implemented.');
                    } } /> )
                    : <div className='nonData'>관심 레포지토리가<br />존재하지 않습니다</div>
                }
                
            </div>
        </div>
    )           
};

export default FavoriteList;