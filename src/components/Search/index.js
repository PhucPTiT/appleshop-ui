import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FaSistrix } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { ProductService } from '~/service/productService';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function Search() {
    const [products, setProducts] = useState();
    useEffect(() => {
        const productService = new ProductService();
        const fetchData = async function () {
            const res = await productService.view();
            setProducts(res);
            return res;
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrap')}>
            <Tippy
                interactive
                // visible={visible}
                placement={'bottom'}
                render={(attrs) => (
                    <div className={cx('infor')} tabIndex="-1" {...attrs}>
                        Đây là kết quả tìm kiếm
                    </div>
                )}
                // onClickOutside={() => setVisible(!visible)}
            >
                <div className={cx('search')}>
                    <FaSistrix />
                    <input type="text" placeholder="Bạn đang tìm kiếm sản phẩm" />
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
