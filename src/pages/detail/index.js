import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import { useParams } from 'react-router-dom';
import { ColorService } from '~/service/colorService';
import { ProductService } from '~/service/productService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Detail() {
    const { productCode } = useParams();
    
    const [product, setProduct] = useState([])

    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.viewProductByCode({productCode});
            setProduct(res);
        };
        fetchData();
    }, [productCode]);

    console.log(product)
    const {imgLinks, name, list} = product;
    const imageArray = imgLinks ? imgLinks.split(" ") : "";
    console.log(imageArray)
    // const title = productCode.charAt(0).toUpperCase() + productCode.slice(1);
    // console.log(title)
    // const data = {
    //     "id": 4,
    //     "createBy": null,
    //     "createDate": null,
    //     "modifiedBy": null,
    //     "modifiedDate": null,
    //     "name": "iphone12",
    //     "code": "iphone_12",
    //     "categoryCode": "iphone",
    //     "description": "đây là iphone 12",
    //     "imgLinks": "hahahahahahahahahahahahaha",
    //     "colors": null,
    //     "list": [
    //         {
    //             "price": 230.00,
    //             "type": "128gb"
    //         },
    //         {
    //             "price": 20.00,
    //             "type": "256gb"
    //         }
    //     ],
    //     "categoryDTO": {
    //         "id": 1,
    //         "createBy": null,
    //         "createDate": null,
    //         "modifiedBy": null,
    //         "modifiedDate": null,
    //         "name": "iphone",
    //         "code": "iphone"
    //     },
    //     "colorDTOs": [
    //         {
    //             "id": 1,
    //             "createBy": null,
    //             "createDate": null,
    //             "modifiedBy": null,
    //             "modifiedDate": null,
    //             "color": "xanh "
    //         },
    //         {
    //             "id": 2,
    //             "createBy": null,
    //             "createDate": null,
    //             "modifiedBy": null,
    //             "modifiedDate": null,
    //             "color": "do "
    //         },
    //         {
    //             "id": 3,
    //             "createBy": null,
    //             "createDate": null,
    //             "modifiedBy": null,
    //             "modifiedDate": null,
    //             "color": "tim "
    //         },
    //         {
    //             "id": 4,
    //             "createBy": null,
    //             "createDate": null,
    //             "modifiedBy": null,
    //             "modifiedDate": null,
    //             "color": "vang "
    //         }
    //     ]
    // };
    // const { imgLinks, colors, name, list } = data;

    // const prices = list.map((item) => item.price);
    // const types = list.map((item) => item.type);
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
                    {/* <div className={cx('memoryAndPrice')}>
                        {list.map((item, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <p>{item.type}</p>
                                    <p>{item.price.toLocaleString('vi-VN') + ' VNĐ'}</p>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className={cx('color')}>

                    </div>
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
