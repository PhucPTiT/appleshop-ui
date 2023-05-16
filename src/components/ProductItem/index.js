import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItem(data) {
    const { imgLinks, colorDTOs, name, list, categoryCode, code } = data.data || {};
    const prices = list.map((item) => item.price);
    const types = list.map((item) => item.type);
    const imageArr = imgLinks.split(' ');
    return (
        <div className={cx('product')}>
            <div
                className={cx('product__img')}
                style={{
                    backgroundImage: `url("${imageArr[0]}")`,
                }}
            ></div>
            <div className={cx('product__color')}>
                {colorDTOs.map((color, index) => {
                    return (
                        <div key={index} className={cx('product__color-item')} style={{ backgroundColor: color.code }}>
                            <span> </span>
                        </div>
                    );
                })}
            </div>
            <div className={cx('product__name')}>
                <span>{name}</span>
            </div>
            <div className={cx('product__memory')}>
                {types.map((type, index) => {
                    return (
                        <div key={index} className={cx('product__memory-item')}>
                            <strong>{type}</strong>
                        </div>
                    );
                })}
            </div>
            <div className={cx('product__price')}>
                <span className={cx('text')}>Giá chỉ</span>
                <span className={cx('price')}>{prices[0].toLocaleString('vi-VN') + ' VNĐ'}</span>
                <strike>{Math.round(prices[0] * 1.3).toLocaleString('vi-VN') + ' VNĐ'}</strike>
            </div>
            <Link to={code} className={cx('btn_view')}>
                <span>Xem chi tiết</span>
            </Link>
        </div>
    );
}

export default ProductItem;
