import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input(props) {
    const { type, name, placeholder, value, onchange, className } = props.props;
    return (
        <input
            className={cx(className)}
            id={name}
            type={type}
            // value={value || ''}
            name={name}
            placeholder={placeholder}
            // onChange={onchange.handleCategoryChange || ''}
        ></input>
    );
}

export default Input;
