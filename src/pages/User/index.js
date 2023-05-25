import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AuthService } from '~/service/authService';
import { FaPencilAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function User() {
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const userId = decode.id;
    const [selectedImage, setSelectedImage] = useState(null);

    const userService = new AuthService();
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchData = async function () {
            const res = await userService.view({ userId });
            setUser(res);
            return res;
        };
        fetchData();
    }, [userId]);
    return (
        <div className={cx('container')}>
            <div className={cx('page')}>
                <div className={cx('left')}>
                    <div className={cx('profile')}>
                        <div className={cx('cover')}></div>
                        <div
                            className={cx('avartar')}
                            style={
                                selectedImage
                                    ? { backgroundImage: `url("${selectedImage}")` }
                                    : user?.images && { backgroundImage: `url("${user.images}")` }
                            }
                        ></div>
                        <label for="avatar">
                            {' '}
                            <FaPencilAlt className={cx('icon')} />
                        </label>
                    </div>
                    <div className={cx('profile_body')}>
                        <div className={cx('fullname')}>{user?.fullName}</div>
                        <div className={cx('username')}>{user?.userName}</div>

                        <div className={cx('item')}>
                            <span className={cx('title')}>Address: </span>
                            <span className={cx('content')}>{user?.address ? user?.address : 'Chưa cập nhật'}</span>
                        </div>
                        <div className={cx('item')}>
                            <span className={cx('title')}>Email: </span>
                            <span className={cx('content')}>{user?.email ? user?.email : 'Chưa cập nhật'}</span>
                        </div>
                        <div className={cx('item')}>
                            <span className={cx('title')}>Tel: </span>
                            <span className={cx('content')}>{user?.phone ? user.phone : 'Chưa cập nhật'}</span>
                        </div>
                        <div className={cx('des')}>Mô tả vị trí vai trò</div>
                        <div className={cx('position')}>{user?.role === 0 ? 'Người dùng' : 'Quản lý trang web'}</div>
                        <div className={cx('wrap_button')}>
                            <div className={'edit'}>Sửa</div>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('changeAvt')}>
                        <input
                            type="file"
                            className={cx('choose')}
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <div className={cx('changeInf')}>
                        <div>Thông tin cá nhân</div>
                        <div className={cx('changeName')}>
                            <span>Đổi họ và tên</span>
                            <input type="text" name="fullName" placeholder="Type your name" />
                        </div>
                        <div className={cx('changeUserName')}>
                            <span>Đổi Username</span>
                            <input type="text" name="userName" placeholder="Type your user name" />
                        </div>
                        <div className={cx('changeAddress')}>
                            <span>Đổi địa điểm</span>
                            <input type="text" name="passWord" placeholder="Type your address" />
                        </div>
                        <div className={cx('email')}>
                            <span>Đổi email</span>
                            <input type="text" name="email" placeholder="Type your email" />
                        </div>
                        <div className={cx('remove')}>
                            <div className={cx('deleteUser')}>Xóa tài khoản</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;