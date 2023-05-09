import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import CategoryAd from '../categoryad';
import ProductAd from '../productad';
import MemoryAd from '../memoryad';
import ColorAd from '../colorAd';


const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('adminpage')}>
            <CategoryAd />
            <MemoryAd/>
            <ColorAd/>
            <ProductAd />

        </div>
    );
}

export default Admin;
