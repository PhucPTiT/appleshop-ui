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
                <div className={cx('left')}></div>
                <div className={cx('right')}></div>
            </div>
        </div>
    );
}

export default Det < div > ail;
