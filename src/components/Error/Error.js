import React from 'react';
import error from '../../images/error.svg';
import './Error.css';

const Error = ({ errorText }) => {
    return (
        <div className='loading-error-wrapper'>
            <img src={error} alt='Error' className='error-img' />
            <div className='loading-error-text'>{errorText}</div>
        </div>
    )
}

export default Error;
