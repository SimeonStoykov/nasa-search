import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, isChecked, toggleCheckboxChange }) => {
    return (
        <div className='checkbox'>
            <input
                id={label}
                type='checkbox'
                value={label}
                checked={isChecked}
                onChange={toggleCheckboxChange}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    )
}

export default Checkbox;
