// react
import { useEffect } from 'react'

// component
import SearchInput from '../../component/SearchInput/SearchInput';
import FavoriteIssuesList from '../../component/FavoriteIssuesList/FavoriteIssuesList';
import FavoriteList from '../../component/FavoriteList/FavoriteList';

// util
import { setStorage } from '../../util/storage';

// css
import './Issues.css';

const Issues = (): JSX.Element => {

    useEffect(() => {
        setStorage('PrevPage', 'issuesPage');
    }, []);

    return (
        <div className='issues'>
            <SearchInput />
            <div className='issuesWrap'>
                <FavoriteIssuesList />
                <FavoriteList />
            </div>
        </div>
    )
    
}

export default Issues;