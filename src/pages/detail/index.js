import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import { useParams } from 'react-router-dom';

import { ProductService } from '~/service/productService';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swipper.scss';
import { FaMemory, FaMoneyBillWave } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Detail() {
    const { productCode } = useParams();

    const [product, setProduct] = useState([]);
    const [priceSelect, setPriceSelect] = useState(0);
    const [colorSelect, setColorSelect] = useState(0);

    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.viewProductByCode({ productCode });
            setProduct(res);
            return res;
        };
        fetchData();
    }, [productCode]);
    const { imgLinks, name, list, colorDTOs } = product;
    const imageArray = imgLinks ? imgLinks.split(' ') : '';
    const SwipperImage = () => {
        return (
            <>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {imageArray !== '' &&
                        imageArray.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img src={item} alt='Hình ảnh sản phẩm'/>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </>
        );
    };
    return (
        <div className={cx('container')}>
            <div className={cx('detail')}>
                <div className={cx('left')}>
                    <SwipperImage />
                </div>
                <div className={cx('right')}>
                    <div className={cx('name')}>{name}</div>
                    <div className={cx('price')}>
                        <div className={cx('wrap-price')}>
                            <span className={cx('real_price')}>
                                {list?.[priceSelect]?.price.toLocaleString('vi-VN') + ' VNĐ'}
                            </span>
                            <strike className={cx('brick_price')}>
                                {Math.floor(list?.[priceSelect]?.price * 1.2).toLocaleString('vi-VN') + ' vnđ'}
                            </strike>
                        </div>
                        <div className={cx('installment')}>
                            <p> Trả góp chỉ từ</p>
                            <strong className={cx('installment-price')}>
                                {Math.floor(list?.[priceSelect]?.price * 0.05).toLocaleString('vi-VN') + ' vnđ/1 tháng'}
                            </strong>
                        </div>
                    </div>
                    <div className={cx('memoryAndPrice')}>
                        {list &&
                            list.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx('item', index === priceSelect ? 'active' : '')}
                                        onClick={() => setPriceSelect(index)}
                                    >
                                        <div className={cx('item-pl')}>
                                            <FaMemory className={cx('icon')} />
                                            <p>{item.type}</p>
                                        </div>
                                        <div className={cx('item-pl')}>
                                            <FaMoneyBillWave className={cx('icon')} />
                                            <p>{item.price.toLocaleString('vi-VN')}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={cx('listColor')}>
                        {colorDTOs &&
                            colorDTOs.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx('item', index === colorSelect ? 'active' : '')}
                                        onClick={() => {
                                            setColorSelect(index);
                                        }}
                                    >
                                        <div className={cx('color')} style={{ backgroundColor: item.code }}>
                                            <p> </p>
                                        </div>
                                        <div className={cx('color_name')} style={{ color: item.code }}>
                                            {item.color}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={cx('btn-buynow')}>MUA NGAY</div>
                    <div className={cx('contact')}>
                        <p>
                            Gọi <a href="tel:18006601">1800 6601</a> để được tư vấn mua hàng (Miễn phí)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
