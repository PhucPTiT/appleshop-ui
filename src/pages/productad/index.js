import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { ProductService } from '~/service/productService';
import Action from '~/components/Action';

const cx = classNames.bind(styles);

function ProductAd() {
    const [categories, SetCategories] = useState([]);

    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.view();
            SetCategories(res);
        };
        fetchData();
    }, []);

    const categoriesTb = categories.map((category) => {
        const products = category.productDTOs ? category.productDTOs : [];
        const productsTb = products.map((product, index) => {
            return (
                <tr key={index}>
                    <th>{product.id}</th>
                    <th>{product.name}</th>
                    <th>{product.code}</th>
                    <th>{product.description}</th>
                    <th>{product.imgLink}</th>
                    <th>{category.name}</th>
                    <th>
                        <Action />
                    </th>
                </tr>
            );
        });
        return productsTb;
    });
    return (
        <div className={cx('product')}>
            <div className={cx('wrap-table')}>
                <div className={cx('header')}>
                    <p className={'content'}>
                        Table <b>Products</b>
                    </p>
                    <Button color="blue">Add Product</Button>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-category')}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Product</th>
                                <th>Product Code</th>
                                <th>Description</th>
                                <th>Image Link</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{categoriesTb}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductAd;
