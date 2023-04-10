import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { ProductDetailService } from '~/service/productDetailService';
import Action from '~/components/Action';
import EditPopup from './components/EditPopup';
import { AddPopup, DeletePopup } from './components';

const cx = classNames.bind(styles);

function ProductDetailAd() {
    const [categories, SetCategories] = useState([]);
    const [rowProductDetail, setRowProductDetail] = useState();
    const [rowDelete, setRowDelete] = useState();

    const [visibleAdd, setVisibleAdd] = useState(false);
    const visibleEdit = rowProductDetail ? rowProductDetail : null;
    const visibleDelete = rowDelete ? rowDelete : null;

    //popup edit
    const handleOpenEditPopup = (productDetail) => {
        setRowProductDetail(productDetail);
    };

    //Popup Delete
    const handleOpenPopupDelete = (product) => {
        setRowDelete(product);
    };

    //popup add
    const handleOpenAddPopup = () => {
        setVisibleAdd(!visibleAdd);
    };

    useEffect(() => {
        const productDetailService = new ProductDetailService();
        const fetchData = async function () {
            const res = await productDetailService.view();
            SetCategories(res);
        };
        fetchData();
    }, [rowProductDetail, rowDelete, visibleAdd]);
    const categoriesTb = categories.map((category) => {
        const products = category.productDTOs ? category.productDTOs : [];
        const productsTb = products.map((product, index) => {
            const productDetails = product.productDetailDTOs ? product.productDetailDTOs : [];
            const productDetailsTb = productDetails.map((productDetail, index) => {
                return (
                    <tr key={index}>
                        <th>{productDetail.id}</th>
                        <th>{product.name}</th>
                        <th>{productDetail.memory}</th>
                        <th>{productDetail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</th>
                        <th>
                            {productDetail.priceBrick.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </th>
                        <th>
                            <Action
                                edit={() => handleOpenEditPopup(productDetail)}
                                remove={() => handleOpenPopupDelete(productDetail)}
                            />
                        </th>
                    </tr>
                );
            });
            return productDetailsTb;
        });
        return productsTb;
    });
    return (
        <div className={cx('productDetail')}>
            {visibleEdit && (
                <EditPopup data={visibleEdit} categories={categories} onclick={() => handleOpenEditPopup(null)} />
            )}
            {visibleDelete && <DeletePopup data={visibleDelete} onclick={() => handleOpenPopupDelete(null)} />}
            {visibleAdd && <AddPopup handleOpenAddPopup={handleOpenAddPopup} categories={categories} />}
            <div className={cx('wrap-table')}>
                <div className={cx('header')}>
                    <p className={'content'}>
                        Table <b>Products</b>
                    </p>
                    <Button color="blue" onclick={handleOpenAddPopup}>
                        Add Product Detail
                    </Button>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-productDetail')}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Product</th>
                                <th>Memory</th>
                                <th>Price</th>
                                <th>Price Brick</th>
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

export default ProductDetailAd;
