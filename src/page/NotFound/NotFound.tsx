// react
import { useEffect } from 'react';

// util
import { setStorage } from '../../util/storage';

// css
import './NotFound.css';

const NotFound = (): JSX.Element => {

    useEffect(() => {
        setStorage('PrevPage', 'notFoundPage');
    }, []);

    return (
        <div className='notFound relative'>
            <img src='/img/git_logo_03.png' alt='GitHub 404' />
        </div>
    )
}

export default NotFound;