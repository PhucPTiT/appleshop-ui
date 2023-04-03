import classNames from 'classnames/bind';
import styles from './HeaderAd.module.scss';

const cx = classNames.bind(styles);
const test = { type: 'text', name: 'code', placeholder: 'Bạn đang tìm kiếm thông tin sản phẩm' };
function HeaderAd() {
    return (
        <div className={cx('header')}>
            <p className={cx('brand')}>WEB ADMIN</p>
            <Input fields={test} className={cx('ad-search')} />
            <FaUser fontSize={'20px'} color="white" />
        </div>
    );
}

export default HeaderAd;
