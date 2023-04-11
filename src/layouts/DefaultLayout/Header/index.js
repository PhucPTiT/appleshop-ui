import React from 'react';
import { FaSistrix, FaUser, FaShoppingCart } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('wrap-header')}>
                    <Link to="/" className={cx('logo')}>
                        <p>P.Studio</p>
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
    );
}

export default Header;
