// react
import { useEffect } from 'react'

// component
import SearchInput from '../../component/SearchInput/SearchInput'

// util
import { setStorage } from '../../util/storage'

// css
import './Home.css'

const Home = (): JSX.Element => {

    useEffect(() => {
        setStorage('PrevPage', 'homePage');
    }, []);

    return (
        <div className='home'>
            <SearchInput />
        </div>
    )
    
}

export default Home;