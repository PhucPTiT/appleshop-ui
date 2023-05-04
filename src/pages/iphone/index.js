import classNames from 'classnames/bind';
import styles from './Iphone.module.scss';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Iphone() {
    return (
        <div className={cx('container')}>
            <div className={cx('category')}>
                <div className={cx('title')}>
                    <span>iPhone</span>
                </div>
                <div className={cx('list-item')}>
                    <ProductItem />
                </div>
            </div>
        </div>
    );
}

export default Iphone;
