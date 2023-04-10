import classNames from 'classnames/bind';
import styles from './AddPopup.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import { ProductDetailService } from '~/service/productDetailService';
import { createPortal } from 'react-dom';

const cx = classNames.bind(styles);

function AddPopup(props) {
    const { handleOpenAddPopup, categories } = props;

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
        },
        {
            type: 'text',
            name: 'price',
            placeholder: 'Nhập giá bán thực tế ',
        },
        {
            type: 'text',
            name: 'priceBrick',
            placeholder: 'Nhập giá khuyến mại',
        },
    ];
    const InputField = fields.map((field, index) => {
        return <FormGroup field={field} register={register} key={index} />;
    });
    const Select = () => {
        return (
            <select {...register('productCode')}>
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
    const onAdd = async (data) => {
        try {
            await productDetailService.add(data);
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
                        <p className={cx('select')}>Select a product code for your product detail</p>
                        <Select />
                        {InputField}
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
