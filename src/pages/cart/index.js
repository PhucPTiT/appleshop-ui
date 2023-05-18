import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import data from '~/data/data.json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';
import { CartService } from '~/service/cartService';
import ProductCartItem from '~/components/ProductCartItem';

const cx = classNames.bind(styles);

function Cart() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [checkRemove, setCheckRemove] = useState(false);
    const handleChageProvince = (e) => {
        setDistrict('');
        setWard('');
        setProvince(e.target.value);
    };
    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value);
        setWard('');
    };
    const handleChangeWard = (e) => {
        setWard(e.target.value);
    };

    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const userId = decode.id;
    const [items, setItems] = useState([]);

    const onRemove = () => {
        setCheckRemove(!checkRemove);
    };

    useEffect(() => {
        const cartService = new CartService();

        const fetchData = async function () {
            const res = await cartService.view({ userId });
            setItems(res);
            return res;
        };

        fetchData();
    }, [checkRemove]);

    const priceAll = useMemo(() => {
        let sum = 0;
        items &&
            items.map((item) => {
                const { productDTO, memory, quantity } = item;
                const price = productDTO.list.find((item) => item.type === memory).price;
                return (sum += price * quantity);
            });
        return sum;
    }, [items]);
    const ChangeItemsList = (index, quantity) => {
        let copyItems = JSON.parse(JSON.stringify(items));
        copyItems[index]['quantity'] = quantity;
        setItems(copyItems);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('return')}>
                <FaAngleLeft />
                <Link to="/">Tiếp tục mua hàng</Link>
            </div>
            <div className={cx('cart')}>
                <div className={cx('count')}>Có {items.length} sản phẩm trong giỏ hàng</div>
                <div className={cx('product-list')}>
                    {items &&
                        items.map((item, index) => {
                            return (
                                <ProductCartItem
                                    props={item}
                                    key={index}
                                    setItems={ChangeItemsList}
                                    index={index}
                                    id={item.id}
                                    onRemove={onRemove}
                                />
                            );
                        })}
                </div>
                <div className={cx('totalprice')}>
                    <div className={cx('wrap')}>
                        <div className={cx('totalprice-row')}>
                            <span>Tổng tiền</span>
                            <span>{(priceAll * 1.2).toLocaleString('vi-VN') + 'đ'}</span>
                        </div>
                        <div className={cx('totalprice-row')}>
                            <span>Giảm: </span>
                            <span>-{(priceAll * 0.2).toLocaleString('vi-VN') + 'đ'}</span>
                        </div>
                        <div className={cx('totalprice-row')}>
                            <strong>Cần thanh toán</strong>
                            <span className={cx('text-price-l')}>{priceAll.toLocaleString('vi-VN') + 'đ'}</span>
                        </div>
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
                        <input type="phone" name="phone" id="phone" placeholder="Nhập số điện thoại" />
                        <input type="email" name="email" id="email" placeholder="Nhập email" />
                    </div>
                    <div className={cx('address')}>
                        <select className={cx('province')} value={province} onChange={handleChageProvince}>
                            <option value="" disabled style={{ display: 'none' }}>
                                tỉnh/thành
                            </option>
                            {data.map((province, index) => {
                                return (
                                    <option key={index} value={province.name}>
                                        {province.name}
                                    </option>
                                );
                            })}
                        </select>
                        <select className={cx('district')} value={district} onChange={handleChangeDistrict}>
                            <option value="" disabled style={{ display: 'none' }}>
                                quận/huyện
                            </option>
                            {province &&
                                data
                                    .find((data) => data.name === province)
                                    .huyen.map((district, index) => {
                                        return (
                                            <option key={index} value={district.name}>
                                                {district.name}
                                            </option>
                                        );
                                    })}
                        </select>
                        <select className={cx('ward')} value={ward} onChange={handleChangeWard}>
                            <option value="" disabled style={{ display: 'none' }}>
                                xã/phường
                            </option>
                            {district &&
                                data
                                    .find((data) => data.name === province)
                                    ?.huyen.find(({ name }) => name === district)
                                    .xa.map((ward, index) => {
                                        return (
                                            <option key={index} value={ward.name}>
                                                {ward.name}
                                            </option>
                                        );
                                    })}
                        </select>
                        <input type="text" name="myhome" id="myhome" placeholder="Nhập địa chỉ nhà của bạn" />
                    </div>
                </form>
                <div className={cx('footer')}>
                    <div className={cx('btn-order')}>Hoàn tất đặt hàng</div>
                    <div className={cx('confirm')}>
                        <p>
                            Bằng cách đặt hàng, bạn đồng ý với <i>Điều khoản sử dụng</i> của chúng tôi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
