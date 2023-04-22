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
import { useState } from 'react';

const cx = classNames.bind(styles);

function EditProduct(props) {
    const { data, onclick, categories, colors } = props;
    const { id, name, code, description, imgLinks, list, categoryDTO, colorDTOs } = data;
    console.log(imgLinks);

    const handleOpenEditPopup = onclick;
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const schema = yup.object().shape({
        // name: yup.string().required('Hãy điền đầy đủ trường này'),
        // code: yup.string().required('Hãy điền đầy đủ trường này'),
        // description: yup.string().required('Hãy điền đầy đủ trường này'),
        // imgLink: yup.string().required('Hãy điền đầy đủ trường này'),
        // categoryCode: yup.string().required('Hãy điền đầy đủ trường này'),
        // listcolors: yup.array().min(1).required(),
    });
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const fields = [
        {
            type: 'text',
            name: 'name',
            placeholder: 'Nhập tên sản phẩm',
            value: name,
        },
        {
            type: 'text',
            name: 'code',
            placeholder: 'Nhập mã sản phẩm',
            value: code,
        },
        {
            type: 'text',
            name: 'description',
            placeholder: 'Nhập mô tả của sản phẩm',
            value: description,
        },
    ];
    const InputField = () => {
        return (
            <div className={cx('inputField')}>
                {fields.map((field, index) => {
                    return <FormGroup field={field} register={register} key={index} />;
                })}
            </div>
        );
    };

    const SelectCategory = () => {
        return (
            <select {...register('categoryCode')} defaultValue={categoryDTO.code}>
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

    const ColorSelect = () => {
        return (
            <div className={cx('colorSelect')}>
                {colors.map((color, index) => {
                    let ischecked = colorDTOs.some((item) => item.color === color.color);
                    return (
                        <div className={cx('item-color')} id={index} key={index}>
                            <p>{color.color}</p>
                            <input
                                type="checkbox"
                                name="listcolor"
                                {...register('listcolor')}
                                defaultChecked={ischecked}
                                value={color.id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    const ListImage = () => {
        let images = imgLinks.trim();
        let linksArray = imgLinks ? images.split(' ') : [];
        linksArray.map((link, index) => {
            return <p> hihihih</p>;
        });
        return <div className={cx('listImage')}>{}</div>;
    };
    const productService = new ProductService();
    const onEdit = (values) => {
        console.log(values);
        // console.log(variableEdit);
        // variableEdit.id = data.id;
        // try {
        //     await productService.edit(variableEdit);
        //     handleOpenEditPopup();
        // } catch (error) {}
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
                        <InputField />
                        <p className={cx('select')}>Select a category code for your product</p>
                        <SelectCategory />
                        <ColorSelect />
                        <ListImage />
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
