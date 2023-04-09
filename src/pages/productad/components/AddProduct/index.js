import classNames from 'classnames/bind';
import styles from './Addproduct.module.scss';
import { FaTimes } from 'react-icons/fa';
import Button from '~/components/Button';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormGroup from '~/components/FormGroup';
import { ProductService } from '~/service/productService';

const cx = classNames.bind(styles);

function AddPopup(props) {
    const { handleOpenAddPopup, categories } = props;

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const schema = yup.object().shape({
        name: yup.string().required('Hãy điền đầy đủ trường này'),
        code: yup.string().required('Hãy điền đầy đủ trường này'),
        description: yup.string().required('Hãy điền đầy đủ trường này'),
        imgLink: yup.string().required('Hãy điền đầy đủ trường này'),
        categoryCode: yup.string().required('Hãy điền đầy đủ trường này'),
    });
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const fields = [
        {
            type: 'text',
            name: 'name',
            placeholder: 'Nhập tên sản phẩm',
        },
        {
            type: 'text',
            name: 'code',
            placeholder: 'Nhập mã sản phẩm',
        },
        {
            type: 'text',
            name: 'description',
            placeholder: 'Nhập mô tả của sản phẩm',
        },
        {
            type: 'text',
            name: 'imgLink',
            placeholder: 'nhập link ảnh của sản phẩm',
        },
    ];
    const InputField = fields.map((field, index) => {
        return <FormGroup field={field} register={register} key={index} />;
    });
    const Select = () => {
        return (
            <select {...register('categoryCode')}>
                {categories.map((category, index) => {
                    return (
                        <option value={category.code} key={index}>
                            {category.name}
                        </option>
                    );
                })}
            </select>
        );
    };
    const productService = new ProductService();
    const onAdd = async (data) => {
        try {
            await productService.add(data);
            handleOpenAddPopup();
        } catch (error) {}
    };

    return createPortal(
        <>
            <div className={cx('wrap_popup')} onClick={handleOpenAddPopup}>
                <div className={cx('add_popup')} onClick={(e) => handleClick(e)}>
                    <div className={cx('header')}>
                        <span>Add Category</span>
                        <FaTimes className={cx('faTime')} onClick={handleOpenAddPopup} />
                    </div>
                    <form className={cx('body')} onSubmit={handleSubmit(onAdd)}>
                        {InputField}
                        <p className={cx('select')}>Select a category code for your product</p>
                        <Select />
                        <Button className={cx('test')} type="submit" size="" color="blue">
                            Add
                        </Button>
                    </form>
                </div>
            </div>
        </>,
        document.body,
    );
}

export default AddPopup;
