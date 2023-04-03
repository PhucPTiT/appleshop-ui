import React from 'react';
import classNames from 'classnames/bind';

import Form from '~/components/Form';
import styles from './Products.module.scss';
import Header from '~/components/Header';

const cx = classNames.bind(styles);

function Products() {
    const fields = [
        { type: 'text', name: 'name', placeholder: 'Enter your category' },
        { type: 'text', name: 'code', placeholder: 'Enter your category code', class: 'ip-categoryCode' },
    ];
    return (
        <div className={cx('test')}>
            <Header />
            <Form fields={fields} className="category" />
        </div>
    );
}

export default Products;
