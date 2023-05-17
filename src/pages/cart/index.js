import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import data from '~/data/data.json';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Cart() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const handleChageProvince = (e) => {
        setProvince(e.target.value);
        setDistrict('');
        setWard('');
    };
    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value);
        setWard('');
    };
    console.log(data.find((data) => data.name == province));
    return (
        <>
            <Link to="/">Tiếp tục mua hàng</Link>
            <div className={cx('.cart')}>
                <div className={cx('body')}>Có một sản phẩm trong giỏ hàng</div>
                <div className={cx('product-list')}></div>
                <div className={cx('totalprice')}>
                    <div>
                        <p>
                            <span>Tổng tiền</span>
                            <span>618.900.000</span>
                        </p>
                        <p>
                            <span>Giảm: </span>
                            <span> -13.760.000</span>
                        </p>
                        <p>
                            <span>Cần thanh toán</span>
                            <span>48.220.000đ</span>
                        </p>
                    </div>
                </div>
                <form>
                    <div className={cx('sex')}>
                        <input type="radio" id="male" name="sex" value="male" />
                        <label htmlFor="male">Nam</label>
                        <input type="radio" id="female" name="sex" value="female" />
                        <label htmlFor="female">Nữ</label>
                    </div>
                    <div className={cx('line')}>
                        <input type="text" name="name" id="name" placeholder="Nhập họ và tên" />
                    </div>
                    <div className={cx('line')}>
                        <input type="text" name="phone" id="phone" placeholder="Nhập số điện thoại" />
                        <input type="text" name="email" id="email" placeholder="Nhập email" />
                    </div>
                    <div className={cx('address')}>
                        <select className={cx('province')} defaultValue={province} onChange={handleChageProvince}>
                            {data.map((province, index) => {
                                return (
                                    <option key={index} value={province.name}>
                                        {province.name}
                                    </option>
                                );
                            })}
                        </select>
                        {/* <select className={cx('district')} defaultValue={district} onChange={handleChangeDistrict}>
                            {province &&
                                data.map((district, index) => {
                                    return (
                                        <option key={index} value={district}>
                                            {' '}
                                            {district}
                                        </option>
                                    );
                                })}
                        </select> */}
                    </div>
                </form>
                <div className={cx('footer')}> Hoàn tất đặt hàng</div>
            </div>
        </>
    );
}

export default Cart;
