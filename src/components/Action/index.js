import { FaTrash, FaPen } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Action.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles);
function Action() {
    return (
        <div className={cx('action')}>
            <Tippy content={'Edit'}>
                <i>
                    <FaPen color="#ffc107" />
                </i>
            </Tippy>
            <Tippy content={'Delete'}>
                <i>
                    <FaTrash color="#e34724" />
                </i>
            </Tippy>
        </div>
    );
}

export default Action;
