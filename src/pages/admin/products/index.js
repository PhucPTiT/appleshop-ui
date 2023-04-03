import React from 'react';
import classNames from 'classnames/bind';
import { FaBars, FaArchive, FaUser, FaCommentDots, FaLightbulb } from 'react-icons/fa';

import SideBarItem from '~/components/ItemSidebar';
import styles from './Products.module.scss';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Products() {
    const ListItems = [
        { icon: FaLightbulb, name: 'Category', to: '/' },
        { icon: FaArchive, name: 'Product', to: '/products' },
        { icon: FaUser, name: 'User', to: '' },
        { icon: FaCommentDots, name: 'Comment', to: '/' },
    ];

    return (
        <div className={cx('test')}>
            <div className={cx('sidebar')}>
                <FaBars className={cx('sidebar-divider')} />
                {ListItems.map((item, index) => {
                    return (
                        <SideBarItem iconLeft={item.icon} to={item.to}>
                            {item.name}
                        </SideBarItem>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;
