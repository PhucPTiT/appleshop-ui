import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { OrderService } from '~/service/orderService';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const cx = classNames.bind(styles);

function Order() {
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const userId = decode.id;
    const [orders, setOrders] = useState();
    useEffect(() => {
        const orderService = new OrderService();
        const fetchData = async function () {
            const res = await orderService.view({ userId });
            setOrders(res);
            return res;
        };
        fetchData();
    }, [userId]);
    console.log(orders);
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
                    <p>Cảm ơn quý khách đã mua hàng tại Studio</p>
                    <p>
                        Nếu có điều gì thắc mắc xin liên hệ bộ phận chăm sóc khách hàng
                        <a href="tel:18006616">18006616</a>
                    </p>
                    <p>Thông tin đơn hàng của bạn</p>
                    {orders &&
                        orders.map((order, index) => {
                            const { sku, fullName, orderPhone, email, orderAddress } = order;
                            const orderTime = new Date(order.orderTime);
                            const formattedDate = orderTime.toLocaleString();
                            console.log(formattedDate);
                            return (
                                <div className={cx('item')} key={index}>
                                    <table>
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
