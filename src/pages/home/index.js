import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper/core';
import 'swiper/css';

const cx = classNames.bind(styles);

SwiperCore.use([Autoplay]);

const BannerIphone14pro = () => {
    return (
        <div className={cx('unit-link')}>
            <Link to="/">
                <span className={cx('name')}>iPhone 14 Pro</span>
                <span className={cx('desc')}>by Apple U.S.A</span>
            </Link>
        </div>
    );
};

const Bannerphone14 = () => {
    return (
        <div className={cx('unit-link-2')}>
            <Link to="/">
                <span className={cx('name')}>iPhone 14</span>
                <span className={cx('desc')}>Kích thước tuyệt vời - Màu sắc đa dạng</span>
            </Link>
        </div>
    );
};
function Home() {
    return (
        <div className={cx('home')}>
            <BannerIphone14pro />
            <Bannerphone14 />
            <div className={cx('banner-watch')}>
                <Link to="/">
                    <span className={cx('name')}>Apple Watch</span>
                    <span className={cx('desc')}>Bước nhảy vọt cho sức khỏe</span>
                </Link>
            </div>
            <div className={cx('module-content')}>
                <div className={cx('banner-mac')}>
                    <Link to="/">
                        <span className={cx('name')}>MacBook Pro</span>
                        <span className={cx('desc')}>Tăng năng suất làm việc</span>
                    </Link>
                </div>
                <div className={cx('banner-ipad')}>
                    <Link to="/">
                        <span className={cx('name')}>iPad</span>
                        <span className={cx('desc')}>Sành điệu. Sáng tạo. Năng động</span>
                    </Link>
                </div>
            </div>
            <Swiper autoplay={{ delay: 3000 }} className="mySwiper">
                <SwiperSlide className={cx('slide')}>
                    <img className={cx('img')} src={require('~/assets/image/home-swp-1.png')} alt="item-footer" />
                </SwiperSlide>
                <SwiperSlide className={cx('slide')}>
                    <img className={cx('img')} src={require('~/assets/image/home-swp-3.jpg')} alt="item-footer" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Home;
