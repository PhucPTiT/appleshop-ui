import { Outlet } from 'react-router-dom';
import HeaderAd from '../header';
import SidebarAd from '../sidebar';

import styles from './DefaultLayoutAd.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayoutAd() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={cx('defaultLayoutAd')}>
            <HeaderAd onClick={showSidebar} />

            <div className={cx('body')}>
                {sidebar && <SidebarAd />}
                <Outlet />
            </div>
        </div>
    );
}
export default DefaultLayoutAd;
