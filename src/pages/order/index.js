import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { OrderService } from '~/service/orderService';
import { useEffect, useRef, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Button from '~/components/Button';
import { FaShippingFast } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function Order() {
    const location = useLocation();
    const isScroll = location.state;
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const userId = decode.id;
    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        const orderService = new OrderService();
        const fetchData = async function () {
            const res = await orderService.view({ userId });
            setOrders(res);
            setIsLoading(false);
            return res;
        };
        fetchData();
    }, [userId, isLoading]);

    useEffect(() => {
        if (isScroll && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
            const note = cx('note');
            scrollRef.current.classList.add(note);
            setTimeout(() => {
                scrollRef.current.classList.remove(note);
            }, 1200);
        }
    }, [orders, isScroll]);
    return (
        <div className={cx('container')}>
            <div className={cx('order')}>
                <div className={cx('head')}>Thông tin đặt hàng</div>
                <div className={cx('thank')}>
                    <img
                        src={require('~/assets/image/order_success.png')}
                        className={cx('order_thanks')}
                        alt="Hình ảnh đặt hàng thành công"
                    ></img>
                    <p className={cx('talk')}>Cảm ơn quý khách đã mua hàng tại Studio</p>
                    <p className={cx('tel')}>
                        Nếu có điều gì thắc mắc xin liên hệ bộ phận chăm sóc khách hàng
                        <a href="tel:18006616">18006616</a>
                    </p>
                </div>
                <div className={cx('infor')}>
                    {orders &&
                        orders.map((order, index) => {
                            const {
                                id,
                                sku,
                                fullName,
                                orderPhone,
                                email,
                                orderAddress,
                                orderItemDTOs,
                                totalPrice,
                                status,
                            } = order;
                            const handleCofirm = () => {
                                const orderService = new OrderService();
                                const fetchData = async function () {
                                    const res = await orderService.update(id);
                                    return res;
                                };
                                fetchData();
                                setIsLoading(true);
                            };
                            const orderTime = new Date(order.orderTime);
                            const formattedDate = orderTime.toLocaleString();
                            const isLastItem = index === orders.length - 1;

                            return (
                                <div className={cx('item')} key={index} ref={isLastItem ? scrollRef : null}>
                                    <table className={cx('person')}>
                                        <tbody>
                                            <tr>
                                                <th>Mã số đơn hàng</th>
                                                <td>{sku}</td>
                                            </tr>
                                            <tr>
                                                <th>Họ và tên</th>
                                                <td>{fullName}</td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td>{orderPhone}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{email}</td>
                                            </tr>
                                            <tr>
                                                <th>Hình thức thanh toán</th>
                                                <td>Thanh toán khi nhận được hàng</td>
                                            </tr>
                                            <tr>
                                                <th>Giao hàng đến</th>
                                                <td>{orderAddress}</td>
                                            </tr>
                                            <tr>
                                                <th>Thời gian nhận đơn</th>
                                                <td>{formattedDate}</td>
                                            </tr>
                                            <tr>
                                                <th>Thời gian dự kiến</th>
                                                <td>3 - 7 ngày sau khi xác nhận đơn hàng</td>
                                            </tr>
                                            <tr>
                                                <th>Ghi chú yêu cầu</th>
                                                <td>Giao hàng tất cả các ngày trong tuần</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className={cx('text-detail')}>Chi tiết đơn hàng</p>
                                    <table className={cx('products')}>
                                        <tbody>
                                            <tr className={cx('headerTable')}>
                                                <th>Thông tin đơn hàng</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                            {orderItemDTOs.map((product, index) => {
                                                const { quantity, memory, color, image, name, price } = product;
                                                return (
                                                    <tr key={index} className={cx('product')}>
                                                        <td>
                                                            <div className={cx('detail')}>
                                                                <img src={image} alt="Hình ảnh của sản phẩm"></img>
                                                                <span>{name + ' ' + memory + ' ' + color}</span>
                                                            </div>
                                                        </td>
                                                        <td>{quantity}</td>
                                                        <td>
                                                            <p className={cx('money')}>
                                                                {(price * quantity).toLocaleString('vi-VN') + 'đ'}
                                                            </p>
                                                            <strike>
                                                                {(price * 1.2 * quantity).toLocaleString('vi-VN') + 'đ'}
                                                            </strike>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className={cx('footer')}>
                                                <td colSpan={2}>
                                                    <div className={cx('status')}>
                                                        <div>
                                                            <FaShippingFast />
                                                            {status}
                                                        </div>
                                                        {status === 'Chờ giao hàng - Thanh Toán' && (
                                                            <Button onclick={() => handleCofirm()} color="#0664f9">
                                                                Đã nhận được hàng
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>Tổng: </span>
                                                    <span className={cx('total_price')}>
                                                        {totalPrice.toLocaleString('vi-VN') + 'đ'}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Order;
