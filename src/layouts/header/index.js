import classNames from 'classnames/bind';
import styles from './HeaderAd.module.scss';
import Input from '~/components/Input';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';

const cx = classNames.bind(styles);
const inputField = {
    type: 'text',
    name: 'code',
    placeholder: 'Bạn đang tìm kiếm thông tin sản phẩm',
    value: '',
};
function HeaderAd(props) {
    const { onClick } = props;
    return (
        <div className={cx('header')}>
            <FaBars className={cx('fabars')} onClick={onClick} />
            <p className={cx('brand')}>WEB ADMIN</p>
            <div className={cx('search')}>
                <FaSearch fontSize={'20px'} color="#444b52" className={cx('faSearch')} />
                <Input props={inputField} />
            </div>
            <FaUser className={cx('faUser')} fontSize={'32px'} color="white" />
        </div>
    );
}

export default HeaderAd;
