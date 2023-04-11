import React from 'react';
import { FaSistrix, FaUser, FaShoppingCart, FaPhoneAlt } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const listNav = [
    { name: 'iPhone', to: '/iphone' },
    { name: 'iPad', to: '/ipad' },
    { name: 'Mac', to: '/mac' },
    { name: 'Apple Watch', to: '/watch' },
    { name: 'Phụ kiện', to: '/phu-kien' },
];

const navigation = listNav.map((item, index) => {
    return (
        <NavLink className={(nav) => cx('item-nav', { active: nav.isActive })} to={item.to} key={index}>
            {item.name}
        </NavLink>
    );
});

function Header() {
    return (
        <div>
            <div className={cx('header')}>
                <div className={cx('container')}>
                    <div className={cx('wrap-header')}>
                        <Link to="/" className={cx('logo')}>
                            <p>Studio</p>
                            <img src={require('~/assets/image/copyright_logo.png')} alt={'myimage'} />
                        </Link>
                        <div className={cx('search')}>
                            <FaSistrix />
                            <input type="text" placeholder="Bạn đang tìm kiếm sản phẩm" />
                        </div>
                        <div className={cx('user')}>
                            <div className={cx('account')}>
                                <FaUser size="24px" color="#fff" />
                            </div>
                            <div className={cx('cart')}>
                                <FaShoppingCart size="24px" color="#fff" />
                                <span>Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('header-nav')}>
                <div className={cx('container')}>
                    {navigation}
                    <div className={cx('item-nav')}>
                        <a className={cx('button-call')} href="tel:18006601">
                            {' '}
                            <FaPhoneAlt />
                            <span>Gọi 1800 6601</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
