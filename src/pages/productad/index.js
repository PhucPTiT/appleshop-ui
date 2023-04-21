import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { ProductService } from '~/service/productService';
import Action from '~/components/Action';
import { AddPopup, EditProduct, DeletePopup } from './components';

const cx = classNames.bind(styles);

function ProductAd() {
    const [products, SetProducts] = useState([]);
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
            SetProducts(res);
        };
        fetchData();
    }, [rowProduct, rowDelete, visibleAdd]);
    const productsTb = products.map((product, index) => {
        const { id, name, code, description, imgLinks, list, categoryDTO, colorDTOs } = product;

        //link image

        // memory -price

        //color
        const thColor = colorDTOs.map((color, index) => {
            return (
                <div className={cx('thcolor')} key={index}>
                    <p>{color.color}</p>
                </div>
            );
        });
        return (
            <tr key={index}>
                <th>{id}</th>
                <th>{name}</th>
                <th>{code}</th>
                <th>{description}</th>
                <th></th>
                <th></th>
                <th>{thColor}</th>
                <th>{categoryDTO.name}</th>
                <th>
                    <Action edit={() => handleOpenEditPopup(product)} remove={() => handleOpenPopupDelete(product)} />
                </th>
            </tr>
        );
    });
    return (
        <div className={cx('product')}>
            {/* {visibleEdit && (
                <EditProduct data={visibleEdit} categories={categories} onclick={() => handleOpenEditPopup(null)} />
            )}
            {visibleDelete && <DeletePopup data={visibleDelete} onclick={() => handleOpenPopupDelete(null)} />}
            {visibleAdd && <AddPopup handleOpenAddPopup={handleOpenAddPopup} categories={categories} />} */}
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Image Links</th>
                                <th>Memory - Price</th>
                                <th>Color</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{productsTb}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductAd;
