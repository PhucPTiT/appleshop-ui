import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { ProductService } from '~/service/productService';
import Action from '~/components/Action';
import { EditProduct } from './components';
import { CategoryService } from '~/service/categoryService';
import { ColorService } from '~/service/colorService';
import { MemoryService } from '~/service/memoryService';
// import { AddPopup, EditProduct, DeletePopup } from './components';

const cx = classNames.bind(styles);

function ProductAd() {
    const [categories, SetCategories] = useState();
    useEffect(() => {
        const categoryService = new CategoryService();
        const fetchData = async function () {
            const res = await categoryService.view();
            SetCategories(res);
        };
        fetchData();
    }, []);

    const [colors, SetColors] = useState();
    useEffect(() => {
        const colorService = new ColorService();
        const fetchData = async function () {
            const res = await colorService.view();
            SetColors(res);
        };
        fetchData();
    }, []);

    const [memories, setMemories] = useState();
    useEffect(() => {
        const memoryService = new MemoryService();
        const fetchData = async function () {
            const res = await memoryService.view();
            setMemories(res);
        };
        fetchData();
    }, []);

    const [products, SetProducts] = useState([]);
    const [rowProduct, SetRowProduct] = useState();
    // const [rowDelete, SetRowDelete] = useState();

    // const [visibleAdd, setVisibleAdd] = useState(false);
    const visibleEdit = rowProduct ? rowProduct : null;
    // const visibleDelete = rowDelete ? rowDelete : null;

    //popup edit
    const handleOpenEditPopup = (product) => {
        SetRowProduct(product);
    };

    // //Popup Delete
    // const handleOpenPopupDelete = (product) => {
    //     setRowDelete(product);
    // };

    // //popup add
    // const handleOpenAddPopup = () => {
    //     setVisibleAdd(!visibleAdd);
    // };

    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.view();
            SetProducts(res);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const handleMouseOver = () => {
            document.body.style.overflow = 'hidden';
        };
        const handleMouseOut = () => {
            document.body.style.overflow = 'auto';
        };
        const editPopup = document.getElementById('edit-popup');
        if (editPopup) {
            editPopup.addEventListener('mouseover', handleMouseOver);
            editPopup.addEventListener('mouseout', handleMouseOut);
        }
        return () => {
            if (editPopup) {
                editPopup.removeEventListener('mouseover', handleMouseOver);
                editPopup.removeEventListener('mouseout', handleMouseOut);
            }
            document.body.style.overflow = 'auto';
            document.body.style.position = 'relative';
        };
    }, [visibleEdit]);
    const productsTb = products.map((product, index) => {
        const { id, name, code, description, imgLinks, list, categoryDTO, colorDTOs } = product;
        //link image
        let images = imgLinks.trim();
        let linksArray = imgLinks ? images.split(' ') : [];
        let thImage = linksArray.map((link, index) => {
            return (
                <div className={cx('thimage')} key={index}>
                    <p>{link}</p>
                </div>
            );
        });

        // memory -price
        const thList = list.map((item, index) => {
            return (
                <div className={cx('thlist')} key={index}>
                    <span>{item.type}</span>
                    <span>----</span>
                    <span>{item.price.toLocaleString('vi-VN') + ' VNĐ'}</span>
                </div>
            );
        });

        // color
        const thColor = colorDTOs.map((color, index) => {
            return (
                <div className={cx('thcolor')} key={index}>
                    <p>{color.color}</p>
                </div>
            );
        });
        return (
            <tr key={index}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{code}</td>
                <td>{description}</td>
                <td>{thImage}</td>
                <td>{thList}</td>
                <td>{thColor}</td>
                <td>{categoryDTO.name}</td>
                <td>
                    <Action edit={() => handleOpenEditPopup(product)} />
                </td>
            </tr>
        );
    });
    return (
        <div className={cx('product')}>
            {visibleEdit && (
                <EditProduct
                    data={visibleEdit}
                    categories={categories}
                    colors={colors}
                    memories={memories}
                    onclick={() => handleOpenEditPopup(null)}
                />
            )}
            {/* {visibleDelete && <DeletePopup data={visibleDelete} onclick={() => handleOpenPopupDelete(null)} />}
            {visibleAdd && <AddPopup handleOpenAddPopup={handleOpenAddPopup} categories={categories} />} */}
            <div className={cx('wrap-table')}>
                <div className={cx('header')}>
                    <p className={'content'}>
                        Table <b>Products</b>
                    </p>
                    <Button color="blue">Add Product</Button>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-product')}>
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
