import React from 'react';
import loading from '../../images/loading.svg';

const Loading = () => {
    return (
        <div className='loading'>
            <img src={loading} alt='Loading...' className='loading-img' />
            <div>Loading...</div>
        </div>
    )
}

export default Loading;
