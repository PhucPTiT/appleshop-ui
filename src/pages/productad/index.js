import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { ProductService } from '~/service/productService';
import Action from '~/components/Action';
import { AddPopup, EditProduct, DeletePopup } from './components';

const cx = classNames.bind(styles);

function ProductAd() {
    const [categories, SetCategories] = useState([]);
    const [rowProduct, setRowProduct] = useState();
    const [rowDelete, setRowDelete] = useState();

    const [visibleAdd, setVisibleAdd] = useState(false);
    const visibleEdit = rowProduct ? rowProduct : null;
    const visibleDelete = rowDelete ? rowDelete : null;

    //popup edit
    const handleOpenEditPopup = (product) => {
        setRowProduct(product);
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
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.view();
            SetCategories(res);
        };
        fetchData();
    }, [rowProduct, rowDelete, visibleAdd]);
    const categoriesTb = categories.map((category) => {
        const products = category.productDTOs ? category.productDTOs : [];
        const productsTb = products.map((product, index) => {
            return (
                <tr key={index}>
                    <th>{product.id}</th>
                    <th>{product.name}</th>
                    <th>{product.code}</th>
                    <th>{product.description}</th>
                    <th>{category.name}</th>
                    <th>
                        <Action
                            edit={() => handleOpenEditPopup(product)}
                            remove={() => handleOpenPopupDelete(product)}
                        />
                    </th>
                </tr>
            );
        });
        return productsTb;
    });
    return (
        <div className={cx('product')}>
            {visibleEdit && (
                <EditProduct data={visibleEdit} categories={categories} onclick={() => handleOpenEditPopup(null)} />
            )}
            {visibleDelete && <DeletePopup data={visibleDelete} onclick={() => handleOpenPopupDelete(null)} />}
            {visibleAdd && <AddPopup handleOpenAddPopup={handleOpenAddPopup} categories={categories} />}
            <div className={cx('wrap-table')}>
                <div className={cx('header')}>
                    <p className={'content'}>
                        Table <b>Products</b>
                    </p>
                    <Button color="blue" onclick={handleOpenAddPopup}>
                        Add Product
                    </Button>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-category')}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Product</th>
                                <th>Product Code</th>
                                <th>Description</th>
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
