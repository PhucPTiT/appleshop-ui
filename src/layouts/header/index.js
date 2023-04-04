import classNames from 'classnames/bind';
import styles from './HeaderAd.module.scss';
import Input from '~/components/Input';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';

const cx = classNames.bind(styles);
const test = { type: 'text', name: 'code', placeholder: 'Bạn đang tìm kiếm thông tin sản phẩm' };
function HeaderAd(props) {
    const { onClick } = props;
    return (
        <div className={cx('header')}>
            <FaBars className={cx('fabars')} onClick={onClick} />
            <p className={cx('brand')}>WEB ADMIN</p>
            <div className={cx('search')}>
                <FaSearch fontSize={'20px'} color="#444b52" />
                <Input fields={test} className={cx('ad-search')} />
            </div>
            <FaUser className={cx('faUser')} fontSize={'32px'} color="white" />
        </div>
    );
}

export default HeaderAd;
