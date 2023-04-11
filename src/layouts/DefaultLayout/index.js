import Header from './Header';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx('defaultLayout')}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
