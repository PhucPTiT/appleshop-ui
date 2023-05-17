import classNames from 'classnames/bind';
import styles from './ProductCartItem.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ProductCartItem(props) {
    const { productDTO, color, quantity, memory } = props.props;
    const { colorDTOs, imgLinks, list } = productDTO;
    const link = imgLinks.split(' ');
    const priceReal = list.find((item) => item.type === memory).price;

    const [quantityItem, setQuantityItem] = useState(quantity);
    const [priceItem, setPriceItem] = useState(quantity * priceReal);

    useEffect(() => {
        setPriceItem(quantityItem * priceReal);
    }, [quantityItem, priceReal]);

    const handleClickMinus = () => {
        if (quantityItem - 1 === 0) {
            setQuantityItem(1);
        } else {
            setQuantityItem(quantityItem - 1);
        }
    };
    const handleClickPlus = () => {
        setQuantityItem(quantityItem + 1);
    };
    return (
        <div className={cx('item')}>
            <img className={cx('image')} src={link[0]} alt="Hình ảnh của sản phẩm" />
            <div className={cx('inside')}>
                <div className={cx('name')}>
                    {productDTO.name} {memory}
                </div>
                <select className={cx('color')} defaultValue={color}>
                    {colorDTOs.map((color, index) => {
                        return (
                            <option value={color.color} key={index}>
                                {color.color}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={cx('quantity')}>
                <FaMinus onClick={() => handleClickMinus()} />
                <div>{quantityItem}</div>
                <FaPlus onClick={() => handleClickPlus()} />
            </div>
            <div className={cx('price')}>
                <div className={cx('real')}>{(priceItem * quantity).toLocaleString('vi-VN') + 'đ'}</div>
                <strike>{Math.floor(priceItem * 1.2 * quantity).toLocaleString('vi-VN') + 'đ'}</strike>
            </div>
        </div>
    );
}

export default ProductCartItem;
