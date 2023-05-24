import classNames from 'classnames/bind';
import styles from './User.module.scss';
const cx = classNames.bind(styles);

function User() {
    return (
        <div className={cx('container')}>
            <div className={cx('page')}>
                <div className={cx('left')}>
                    <div className={cx('profile')}>
                        <div className={cx('cover')}></div>
                        <div className={cx('avatar')}></div>
                    </div>
                    <div className={cx('profile_body')}>
                        <div className={cx('fullname')}></div>
                        <div className={cx('username')}></div>
                        <div className={cx('address')}></div>
                        <div className={cx('email')}></div>
                        <div className={cx('phone')}></div>
                        <div className={cx('des')}>Mô tả vị trí vai trò</div>
                        <div className={cx('position')}></div>
                    </div>
                </div>
                <div className={cx('right')}></div>
            </div>
        </div>
    );
}

export default User;
