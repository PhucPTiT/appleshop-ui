import HeaderAd from '~/layouts/header';
import SidebarAd from '~/layouts/sidebar';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Admin() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={cx('adminpage')}>
            <HeaderAd onClick={showSidebar} />
            {sidebar && <SidebarAd />}
        </div>
    );
}

export default Admin;
