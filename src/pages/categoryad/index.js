import classNames from 'classnames/bind';
import styles from './CategoryAd.module.scss';
import { CategoryService } from '~/service/categoryService';
import { useEffect, useState } from 'react';
import EditCategoryPopup from '~/components/EditCategoryPopup';
import Action from '~/components/Action';
import Button from '~/components/Button';
import { FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import FormGroup from '~/components/FormGroup';

const cx = classNames.bind(styles);

function CategoryAd() {
    const [categories, setCategories] = useState([]);
    const [rowCategory, setRowCategory] = useState(); // select row edit
    const [rowDelete, setRowDelete] = useState();

    const [visibleAdd, setVisibleAdd] = useState(false);
    const visibleDelete = rowDelete ? rowDelete : null;
    const visibleEdit = rowCategory ? rowCategory : null;

    //popupEdit
    const handleOpenPopup = (category) => {
        setRowCategory(category);
    };

    //Popup Delete
    const handleOpenPopupDelete = (category) => {
        setRowDelete(category);
    };

    //popup add
    const handleOpenAddPopup = () => {
        setVisibleAdd(!visibleAdd);
    };

    // xoa su kien noi bot
    const handleClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const categoryService = new CategoryService();
        const fetchData = async function () {
            const res = await categoryService.view();
            setCategories(res);
        };
        fetchData();
    }, [rowCategory, rowDelete]);

    const categoriesTb = categories.map((category, index) => {
        return (
            <tr key={index}>
                <th>{category.id}</th>
                <th>{category.name}</th>
                <th>{category.code}</th>
                <th>
                    <Action edit={() => handleOpenPopup(category)} remove={() => handleOpenPopupDelete(category)} />
                </th>
            </tr>
        );
    });

    const categoryService = new CategoryService();
    const onDelete = async () => {
        try {
            await categoryService.remove(visibleDelete);
            handleOpenPopupDelete(null);
        } catch (error) {}
    };
    const DeletePopup = () => {
        return createPortal(
            <>
                <div className={cx('wrap_popup')} onClick={() => handleOpenPopupDelete(null)}>
                    <div className={cx('delete_popup')} onClick={(e) => handleClick(e)}>
                        <div className={cx('delete_popup-header')}>
                            <span>Delete Category</span>
                            <FaTimes className={cx('faTime')} onClick={() => handleOpenPopupDelete(null)} />
                        </div>
                        <div className={cx('delete_popup-body')}>
                            <p className={cx('question')}>
                                Are you sure want to delele <b>{visibleDelete.name}</b> ?
                            </p>
                            <p className={cx('warning')}>This action cannot be undo !!!</p>
                        </div>
                        <div className={cx('delete_popup-footer')}>
                            <Button onclick={onDelete} size="" color="red">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </>,
            document.body,
        );
    };

    const AddPopup = () => {
        const fields = [
            {
                type: 'text',
                name: 'name',
                placeholder: 'Hãy thêm tên thể loại sản phẩm',
            },
            {
                type: 'text',
                name: 'code',
                placeholder: 'Hãy thêm mã thể loại sản phẩm',
            },
        ];

        const InputField = fields.map((field, index) => {
            return <FormGroup field={field} key={index} />;
        });
        return createPortal(
            <>
                <div className={cx('wrap_popup')}>
                    <div className={cx('popup')}>
                        <div className={cx('header')}>
                            <span>Add Category</span>
                            <FaTimes className={cx('faTime')} />
                        </div>
                        <form className={cx('body')}>
                            {/* {InputField} */}
                            <Button type="submit" size="" color="blue">
                                Add
                            </Button>
                        </form>
                    </div>
                </div>
            </>,
            document.body,
        );
    };

    return (
        <div className={cx('category')}>
            <div className={cx('wrap-table')}>
                {visibleDelete && DeletePopup()}
                {visibleEdit && <EditCategoryPopup data={visibleEdit} onclick={() => handleOpenPopup(null)} />}
                {visibleAdd && AddPopup()}
                <div className={cx('header')}>
                    <p content={'abc'}>
                        Table <b>Categories</b>
                    </p>
                    <Button color="blue" onclick={handleOpenAddPopup}>
                        Add Category
                    </Button>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-category')}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Category</th>
                                <th>Category Code</th>
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

export default CategoryAd;
