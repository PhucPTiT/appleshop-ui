import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FaBox, FaCrown, FaHandsHelping, FaShieldAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

const listKey = [
    {
        icon: <FaHandsHelping />,
        title: 'Thương hiệu đảm bảo',
        desc: 'Sản phẩm chính hãng Apple',
    },
    {
        icon: <FaShieldAlt />,
        title: 'Bảo hành chính hãng',
        desc: 'Bảo hành theo chính sách Apple',
    },
    {
        icon: <FaBox />,
        title: 'Giao hàng tận nơi',
        desc: 'Tại 63 tỉnh thành',
    },
    {
        icon: <FaCrown />,
        title: 'Trải nghiệm Premium',
        desc: 'Không gian trải nghiệm cao cấp',
    },
];
const KeySelling = listKey.map((key, index) => {
    const { icon, title, desc } = key;
    return (
        <div className={cx('key-selling-item')}>
            {icon}
            <div className={cx('wrap-content')}>
                <span className={cx('title')}>{title}</span>
                <span className={cx('desc')}>{desc}</span>
            </div>
        </div>
    );
});
function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('key-selling')}>{KeySelling}</div>
            <div className={cx('footer-middle')}>
                <div className={cx('footer-info')}>
                    <div className={cx('hotline')}>
                        <div className={cx('item')}>
                            <div className={cx('text')}>Giao hàng miễn phí</div>
                            <a className={cx('phone')} href="tel:18006601">
                                1800 6601
                            </a>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('text')}>Chăm sóc khách hàng</div>
                            <a className={cx('phone')} href="tel:18006616">
                                1800 6616
                            </a>
                        </div>
                    </div>
                    <div className={cx('service')}>
                        <div className={cx('text')}> Dịch vụ và hỗ trợ</div>
                        <ul>
                            <li>HCM: 121 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM</li>
                            <li>Hà Nội: 92 Hai Bà Trưng, P. Cửa Nam, Q. Hoàn Kiếm, TP. Hà Nội</li>
                            <li>Đà Nẵng: 240 Hoàng Diệu, Q. Hải Châu, TP. Đà Nẵng</li>
                            <li>Cần Thơ: 52 - 54 - 56 Đường 30/4, P. An Phú, Q. Ninh Kiều, Cần Thơ</li>
                        </ul>
                    </div>
                    <div className={cx('img')}>
                        <img src={require('~/assets/image/lg-bct.png')} alt="item-footer" />
                    </div>
                </div>
                <div className={cx('footer-category')}></div>
            </div>
        </div>
    );
}

export default Footer;
