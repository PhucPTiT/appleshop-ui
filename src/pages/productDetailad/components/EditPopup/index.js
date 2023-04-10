import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './EditPopup.module.scss';
import { FaTimes } from 'react-icons/fa';
import Button from '~/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormGroup from '~/components/FormGroup';
import { ProductDetailService } from '~/service/productDetailService';

const cx = classNames.bind(styles);

function EditPopup(props) {
    const { data, categories, onclick } = props;

    const handleOpenEditPopup = onclick;
    const handleClick = (e) => {
        e.stopPropagation();
    };
    const schema = yup.object().shape({
        memory: yup.string().required('Hãy điền đầy đủ trường này'),
        price: yup.string().required('Hãy điền đầy đủ trường này'),
        priceBrick: yup.string().required('Hãy điền đầy đủ trường này'),
        productCode: yup.string().required(),
    });
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
    const fields = [
        {
            type: 'text',
            name: 'memory',
            placeholder: 'Nhập tên thông tin bộ nhớ ',
            value: data.memory,
        },
        {
            type: 'text',
            name: 'price',
            placeholder: 'Nhập giá bán thực tế ',
            value: data.price,
        },
        {
            type: 'text',
            name: 'priceBrick',
            placeholder: 'Nhập giá khuyến mại',
            value: data.priceBrick,
        },
    ];
    const InputField = fields.map((field, index) => {
        return <FormGroup field={field} register={register} key={index} />;
    });
    const Select = () => {
        return (
            <select {...register('productCode')} defaultValue={data.productCode}>
                {categories.map((category, index) => {
                    const products = category.productDTOs ? category.productDTOs : [];
                    return products.map((product, index) => {
                        return (
                            <option value={product.code} key={index}>
                                {product.name}
                            </option>
                        );
                    });
                })}
            </select>
        );
    };
    const productDetailService = new ProductDetailService();
    const onEdit = async (variableEdit) => {
        variableEdit.id = data.id;
        try {
            await productDetailService.edit(variableEdit);
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
                        <p className={cx('select')}>Select a product code for your product detail</p>
                        <Select />
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

export default EditPopup;
