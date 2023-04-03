import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function ItemSidebar(props) {
    const { fields, className } = props;
    const { type, name, placeholder } = fields;
    return <input className={cx(className)} type={type} name={name} placeholder={placeholder}></input>;
}

export default ItemSidebar;
