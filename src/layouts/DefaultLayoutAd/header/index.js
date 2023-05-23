import classNames from 'classnames/bind';
import styles from './HeaderAd.module.scss';
import { FaBars, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa';
import SearchAd from '~/components/SearchAd';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderAd(props) {
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const { onClick } = props;
    const handleClickUserIcon = () => {
        setVisible(!visible);
    };
    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);
    const MenuInforUser = () => {
        if (token) {
            const decoded = jwt_decode(token);
            const { username, name } = decoded;
            return (
                <div className={cx('infor')}>
                    <div className={cx('wrap-infor', 'item')}>
                        <div className={cx('username')}>Xin chào: {username}</div>
                    </div>
                    <div className={cx('sign-out', 'item')} onClick={handleSignOut}>
                        <FaSignOutAlt className={cx('icon')} />
                        Đăng Xuất
                    </div>
                </div>
            );
        }
    };
    return (
        <div className={cx('header')}>
            <FaBars className={cx('fabars')} onClick={onClick} />
            <p className={cx('brand')}>WEB ADMIN</p>
            <SearchAd />
            <div>
                <Tippy
                    interactive
                    visible={visible}
                    placement={'bottom-end'}
                    render={(attrs) => (
                        <div className={cx('infor')} tabIndex="-1" {...attrs}>
                            <MenuInforUser />
                        </div>
                    )}
                    onClickOutside={() => setVisible(!visible)}
                >
                    <div className={cx('account')}>
                        <FaUser
                            className={cx('faUser')}
                            fontSize={'32px'}
                            color="white"
                            onClick={handleClickUserIcon}
                        />
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default HeaderAd;
