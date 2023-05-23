import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import ProductItem from '~/components/ProductItem';
import { ProductService } from '~/service/productService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Category(props) {
    const { title } = props;

    let device;
    switch (title) {
        case 'iPhone':
            device = 'iphone';
            break;
        case 'iPad':
            device = 'ipad';
            break;
        case 'MAC':
            device = 'macbook';
            break;
        case 'Apple Watch':
            device = 'applewatch';
            break;
        case 'Phụ kiện':
            device = 'phu-kien';
            break;
        default:
            break;
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.viewProductByCate({ device });
            setProducts(res);
        };
        fetchData();
    }, [device]);

    const listProduct = products.map((product, index) => {
        return <ProductItem data={product} key={index} />;
    });

    return (
        <div className={cx('container')}>
            <div className={cx('category')}>
                <div className={cx('title')}>
                    <span>{title}</span>
                </div>
                <div className={cx('list-item')}>{listProduct}</div>
            </div>
        </div>
    );
}

export default Category;
