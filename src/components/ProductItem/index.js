import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem() {
    const data = {
        name: 'ipad gen9',
        code: 'ipad_gen_9',
        description: 'đây là ipad gen 9',
        categoryCode: 'ipad',
        list: [
            {
                price: 49000000,
                type: '128gb',
            },
            {
                price: 1000000000,
                type: '256gb',
            },
        ],
        colors: ['1', '2', '3', '5'],
        imgLinks:
            'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/9/9/637983183015007948_iphone-14-pro-max-dd-fstudio.jpg',
    };
    const { imgLinks, colors, name, list } = data;

    const prices = list.map((item) => item.price);
    const types = list.map((item) => item.type);

    console.log(imgLinks);
    return (
        <div className={cx('product')}>
            <div
                className={cx('product__img')}
                style={{
                    backgroundImage: `url("${imgLinks}")`,
                }}
            ></div>
            <div className={cx('product__color')}>
                {colors.map((color, index) => {
                    return (
                        <div key={index} className={cx('product__color-item')}>
                            <span>{color}</span>
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
            <div className={cx('btn_view')}>
                <span>Xem chi tiết</span>
            </div>
        </div>
    );
}

export default ProductItem;
