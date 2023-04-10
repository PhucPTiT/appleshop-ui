import Header from './Header';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames';
import Footer from './Footer';

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx('defaultLayout')}>
            <Header />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
