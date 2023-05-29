import classNames from 'classnames/bind';
import styles from './PopupComment.module.scss';
import Button from '~/components/Button';
import { FaStar, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PopupComment(props) {
    const { listProduct, userId } = props.props;
    console.log(props.remove);
    const close = props.remove;
    const [rating, setRating] = useState(1);

    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    return createPortal(
        <>
            <div className={cx('wrap')}>
                <div className={cx('popup')}>
                    <div className={cx('header')}>
                        <p className={cx('title')}> Đánh giá sản phẩm</p>
                        <FaTimes onClick={close} />
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('list')}>
                            {listProduct.map((product, index) => {
                                const { image, name } = product;
                                return (
                                    <div className={cx('item')} key={index}>
                                        <div className={cx('product')}>
                                            <img src={image} alt="Hình ảnh của sản phẩm"></img>
                                            <p className={cx('product_name')}>{name}</p>
                                        </div>
                                        <ul className="rating">
                                            {Array(5)
                                                .fill(0)
                                                .map((_, starIndex) => (
                                                    <li key={starIndex} onClick={() => handleStarClick(starIndex + 1)}>
                                                        <FaStar className={starIndex < rating ? cx('yellow') : ''} />
                                                    </li>
                                                ))}
                                        </ul>
                                        <textarea
                                            maxLength={2000}
                                            type="text"
                                            className={cx('comment')}
                                            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm"
                                        ></textarea>
                                        <Button color="#32373d">Hoàn tất</Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body,
    );
}

export default PopupComment;
