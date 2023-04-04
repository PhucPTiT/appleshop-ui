import classNames from 'classnames/bind';
import styles from './CategoryAd.module.scss';
import { CategoryService } from '~/service/categoryService';
import { useEffect, useState } from 'react';
import Action from '~/components/Action';

const cx = classNames.bind(styles);

function CategoryAd() {
    const [categories, setCategories] = useState();

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
                    <Action />
                </th>
            </tr>
        );
    });
    return (
        <div className={cx('category')}>
            <div className={cx('wrap-table')}>
                <div className={cx('header')}>
                    <p>
                        Table <b>Categories</b>
                    </p>
                </div>
                <div className={cx('body')}>
                    <table className={cx('table-category')}>
                        <thead>
                            <tr>
                                <th>#</th>
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
