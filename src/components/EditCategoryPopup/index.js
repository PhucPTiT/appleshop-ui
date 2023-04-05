import classNames from 'classnames/bind';
import styles from './EditCategoryPopup.module.scss';

import { FaTimes } from 'react-icons/fa';
import Button from '../Button';
import { createPortal } from 'react-dom';
import * as yup from 'yup';
import FormGroup from '../FormGroup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const cx = classNames.bind(styles);

function EditCategoryPopup(data) {
    const schema = yup.object().shape({
        category: yup.string().required('Hãy điền đầy đủ trường này'),
        categoryCode: yup.string().required('Hãy điền đầy đủ trường này'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const category = data.data;
    const handleOpenPopup = data.onclick;
    const fields = [
        {
            type: 'text',
            name: 'category',
            placeholder: 'Chỉnh sửa thông tin thể loại sản phẩm',
            value: category.name,
            classNames: 'category-ip',
        },
        {
            type: 'text',
            name: 'categoryCode',
            placeholder: 'Chỉnh sửa mã thể loại sản phẩm',
            value: category.code,
            classNames: 'categoryCode-ip',
        },
    ];
    const InputField = fields.map((field, index) => {
        return <FormGroup field={field} register={register} key={index} />;
    });

    const handleClick = (e) => {
        e.stopPropagation();
    };
    const onEdit = () => {
        console.log('state');
    };
    return createPortal(
        <>
            <div className={cx('wrap_popup')} onClick={handleOpenPopup}>
                <div className={cx('popup')} onClick={(e) => handleClick(e)}>
                    <div className={cx('header')}>
                        <span>Edit Category</span>
                        <FaTimes className={cx('faTime')} onClick={handleOpenPopup} />
                    </div>
                    <form className={cx('body')} onSubmit={handleSubmit(onEdit)}>
                        {InputField}
                        <Button type="submit" size="" color="green">
                            Edit
                        </Button>
                    </form>
                </div>
            </div>
        </>,
        document.body,
    );
}
export default EditCategoryPopup;
