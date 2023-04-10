import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import CategoryAd from '../categoryad';
import ProductAd from '../productad';
import ProductDetailAd from '../productDetailad';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('adminpage')}>
            <CategoryAd />
            <ProductAd />
            <ProductDetailAd />
        </div>
    );
}

export default Admin;
