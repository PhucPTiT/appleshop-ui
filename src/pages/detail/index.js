import classNames from 'classnames/bind';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Detail() {
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
    return (
        <div className={cx('container')}>
            <div className={cx('detail')}>
                <div className={cx('left')}>
                    <img src={imgLinks} />
                </div>
                <div className={cx('right')}>
                    <div className={cx('name')}>{name}</div>
                    <div className={cx('price')}>
                        <span className={cx('real_price')}></span>
                        <strike> </strike>
                    </div>
                    <div className={cx('memoryAndPrice')}>
                        {list.map((item, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <p>{item.type}</p>
                                    <p>{item.price.toLocaleString('vi-VN') + ' VNĐ'}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('color')}></div>
                    <div className={cx('btn-buynow')}>Mua ngay</div>
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
