import classNames from 'classnames/bind';
import styles from './Iphone.module.scss';

const cx = classNames.bind(styles);

function Iphone() {
    return <div className={cx('iphone')}> Đây là trang iphone</div>;
}

export default Iphone;
