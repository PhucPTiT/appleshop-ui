import classNames from 'classnames/bind';
import styles from './EditCategoryPopup.module.scss';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Input from '../Input';

const cx = classNames.bind(styles);

function EditCategoryPopup(props) {
    const prop = props.props;
    const [category, setCategory] = useState(prop.name);
    const [categoryCode, setCategoryCode] = useState(prop.code);
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCategoryCodeChange = (event) => {
        setCategoryCode(event.target.value);
    };
    const fields = [
        {
            type: 'text',
            name: 'category',
            placeholder: 'Chỉnh sửa thông tin thể loại sản phẩm',
            value: category,
            classNames: 'category-ip',
            onchange: { handleCategoryChange },
        },
        {
            type: 'text',
            name: 'categoryCode',
            placeholder: 'Chỉnh sửa mã thể loại sản phẩm',
            value: categoryCode,
            classNames: 'categoryCode-ip',
            onchange: { handleCategoryCodeChange },
        },
    ];
    const InputField = fields.map((field, index) => {
        return <Input props={field} key={index} />;
    });
    return (
        <div className={cx('wrap_popup')}>
            <div className={cx('popup')}>
                <div className={cx('header')}>
                    <span>Edit Category</span>
                    <FaTimes />
                </div>
                <form className={cx('body')}>{InputField}</form>
            </div>
        </div>
    );
}

export default EditCategoryPopup;
