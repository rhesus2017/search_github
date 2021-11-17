// react
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

// redux
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { IssuesData, ResetIssuesData } from "../../action";

// component
import IssuesCard from "../IssuesCard/IssuesCard";

// css
import './FavoriteIssuesList.css'

// type
import { CardData, IssueData } from "../../types";

const FavoriteIssuesList = (): JSX.Element => {

    const mySwal = require('sweetalert2');
    const dispatch = useDispatch();
    const [ Loading, setLoading ] = useState<string>('none');
    const [ FadeIn, setFadeIn ] = useState<boolean>(false);
    const getFavoriteData = useSelector((state: RootStateOrAny): {data: CardData[]} => state.FavoriteData);
    const getIssuesData = useSelector((state: RootStateOrAny): {data: IssueData[]} => state.IssuesData);
    const setIssuesData = (data: IssueData[]): void => { dispatch(IssuesData(data)); }
    const resetIssuesData = (): void => { dispatch(ResetIssuesData()); }

    useEffect(() => {
        resetIssuesData();
        setFavoriteIssuesListInState();
    }, [getFavoriteData]); // eslint-disable-line react-hooks/exhaustive-deps

    const setFavoriteIssuesListInState = useCallback(() => {
        setFadeIn(false);
        setLoading('all');
        Promise.all(
            getFavoriteData.data.map(( favoriteData ) => {
                const args = favoriteData.full_name.split('/');
                return axios({url: `https://api.github.com/repos/${args[0]}/${args[1]}/issues?per_page=28&page=1`})
            })
        ).then((response) => {
            response.forEach((res) => setIssuesData(res.data));
        }).catch((error) => {
            mySwal.fire({icon: 'error', title: '실패', html: '알 수 없는 문제로 이슈 가져오기에 실패했습니다'});
        }).finally(() =>{
            setFadeIn(true);
            setLoading('none');
        });
    }, [getFavoriteData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='favoriteIssuesList'>
            <div className={`loading ${Loading}`}>
                <ReactLoading type="spin" color="#478bff" />
            </div>
            <p>총 {getIssuesData.data.length}개의 데이터가 있습니다</p>
            <div className={`favoriteIssuesListWrap ${FadeIn}`}>
                {   
                    getIssuesData.data.length !== 0
                    ?   getIssuesData.data.map((Data, index) => {
                            return (
                                <IssuesCard key={index} Data={Data} />
                            )
                        })
                    :   <div className='nonData'>검색결과가 존재하지 않습니다</div>
                }
                
            </div>
        </div>
    )
}

export default FavoriteIssuesList