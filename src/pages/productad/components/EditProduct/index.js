import classNames from 'classnames/bind';
import styles from './Edit.module.scss';
import { FaTimes } from 'react-icons/fa';
import Button from '~/components/Button';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormGroup from '~/components/FormGroup';
import { ProductService } from '~/service/productService';

const cx = classNames.bind(styles);

function EditProduct(props) {
    const { data, categories, onclick } = props;

    const handleOpenEditPopup = onclick;
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
            value: data.name,
        },
        {
            type: 'text',
            name: 'code',
            placeholder: 'Nhập mã sản phẩm',
            value: data.code,
        },
        {
            type: 'text',
            name: 'description',
            placeholder: 'Nhập mô tả của sản phẩm',
            value: data.description,
        },
        {
            type: 'text',
            name: 'imgLink',
            placeholder: 'nhập link ảnh của sản phẩm',
            value: data.imgLink,
        },
    ];
    const InputField = fields.map((field, index) => {
        return <FormGroup field={field} register={register} key={index} />;
    });
    const Select = () => {
        return (
            <select {...register('categoryCode')} defaultValue={data.categoryCode}>
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
    const onEdit = async (variableEdit) => {
        variableEdit.id = data.id;
        try {
            await productService.edit(variableEdit);
            handleOpenEditPopup();
        } catch (error) {}
    };

    return createPortal(
        <>
            <div className={cx('wrap_popup')} onClick={handleOpenEditPopup}>
                <div className={cx('popup')} onClick={(e) => handleClick(e)}>
                    <div className={cx('header')}>
                        <span>Edit Product</span>
                        <FaTimes className={cx('faTime')} onClick={handleOpenEditPopup} />
                    </div>
                    <form className={cx('body')} onSubmit={handleSubmit(onEdit)}>
                        {InputField}
                        <p className={cx('select')}>Select a category code for your product</p>
                        <Select />
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

export default EditProduct;
