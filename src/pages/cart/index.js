import classNames from "classnames/bind";
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    return (<div className={cx('.cart')}>
        <div className={cx('header')}>Giỏ Hàng</div>
        <div className={cx('body')}> Đây là danh sách sản phẩm</div>
        <div className={cx('footer')}> Hoàn tất đặt hàng</div>
    </div>  );
}

export default Ca<div>rt;