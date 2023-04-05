import classNames from 'classnames/bind';
import styles from './CategoryAd.module.scss';
import { CategoryService } from '~/service/categoryService';
import { useEffect, useState } from 'react';
import EditCategoryPopup from '~/components/EditCategoryPopup';
import Action from '~/components/Action';

const cx = classNames.bind(styles);

function CategoryAd() {
    const [categories, setCategories] = useState([]);
    const [rowCategory, setRowCategory] = useState();
    const visibleEdit = rowCategory ? rowCategory : null;

    const handleOpenPopup = (category) => {
        setRowCategory(category);
    };

    useEffect(() => {
        const categoryService = new CategoryService();
        const fetchData = async function () {
            const res = await categoryService.view();
            setCategories(res);
        };
        fetchData();
    }, []);
    const categoriesTb = categories.map((category, index) => {
        return (
            <tr key={index}>
                <th>{category.id}</th>
                <th>{category.name}</th>
                <th>{category.code}</th>
                <th>
                    <Action onclick={() => handleOpenPopup(category)} exits={visibleEdit} />
                </th>
            </tr>
        );
    });
    return (
        <div className={cx('category')}>
            <div className={cx('wrap-table')}>
                {visibleEdit && <EditCategoryPopup data={visibleEdit} onclick={() => handleOpenPopup(null)} />}
                <div className={cx('header')}>
                    <p content={'abc'}>
                        Table <b>Categories</b>
                    </p>
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
