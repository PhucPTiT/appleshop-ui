import { FaEye, FaTrash, FaPen } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Action.module.scss';

const cx = classNames.bind(styles);
function Action() {
    return (
        <div className={cx('action')}>
            <FaEye color="#03a9f4" />
            <FaPen color="#ffc107" />
            <FaTrash color="#e34724" />
        </div>
    );
}

export default Action;
