import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, isChecked, toggleCheckboxChange }) => {
    return (
        <div className='checkbox'>
            <label>
                <input
                    type='checkbox'
                    value={label}
                    checked={isChecked}
                    onChange={toggleCheckboxChange}
                />
                {label}
            </label>
        </div>
    )
}

export default Checkbox;
