import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { AuthService } from '~/service/authService';
import { FaPencilAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function User() {
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const userId = decode.id;
    const [selectedImage, setSelectedImage] = useState(null);

    const userService = new AuthService();
    const [user, setUser] = useState();

    const leftContainer = useRef(null);
    const rightContainerBt = useRef(null);

    useEffect(() => {
        const fetchData = async function () {
            const res = await userService.view({ userId });
            setUser(res);
            return res;
        };
        fetchData();
    }, [userId]);
    const show = cx('show');
    const show2 = cx('show2');
    const OpenRight = () => {
        rightContainerBt.current.classList.toggle(show);
        leftContainer.current.classList.toggle(show2);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('page')}>
                <div className={cx('left')} ref={leftContainer}>
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
                    </div>
                    <div className={cx('profile_body')}>
                        <div className={cx('fullname')}>{user?.fullName}</div>
                        <div className={cx('wrap_button')}>
                            <div className={cx('username')}>{user?.userName}</div>
                            <div className={'edit'}>
                                <Tippy content={'Sửa Thông Tin'} placement="right">
                                    <i>
                                        <FaPencilAlt onClick={() => OpenRight()} />
                                    </i>
                                </Tippy>
                            </div>
                        </div>
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
                        <div className={cx('btns')}>
                            <div className={cx('remove')}>
                                <div className={cx('deleteUser')}>Xóa tài khoản</div>
                            </div>
                            <div className={cx('editPasswpord')}>
                                <div>Đổi Mật Khẩu</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('wrap-right')}>
                    <form className={cx('right')} ref={rightContainerBt}>
                        <div className={cx('changeInf')}>
                            <label htmlFor="avatar" className={cx('center')}>
                                Đổi thông tin cá nhân
                            </label>
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
                            <div className={cx('changeName')}>
                                <span>Đổi họ và tên</span>
                                <input type="text" name="fullName" placeholder="Type your name" />
                            </div>
                            <div className={cx('changeUserName')}>
                                <span>Đổi Username</span>
                                <input type="text" name="userName" placeholder="Type your user name" />
                            </div>
                            <div className={cx('changeAddress')}>
                                <span>Đổi địa chỉ</span>
                                <input type="text" name="passWord" placeholder="Type your address" />
                            </div>
                            <div className={cx('email')}>
                                <span>Đổi email</span>
                                <input type="text" name="email" placeholder="Type your email" />
                            </div>

                            <div className={cx('edit')}>
                                <div>Cập nhật</div>
                            </div>
                        </div>
                    </form>
                    <div className={cx('popupdelete')}>
                        <p className={cx('question')}>Bạn có chắc chắc muốn xóa tài khoản này?</p>
                        <p className={cx('warning')}>Hành động này không thể hoàn tác !</p>
                        <div className={cx('boxBtnPopup')}>
                            <div className={cx('confirm-dl')}>Xác Nhận</div>
                            <div className={cx('cancel-dl')}>Hủy</div>
                        </div>
                    </div>
                    <div className={cx('boxChangePass')}>
                        <p className={cx('name')}>Đổi Mật Khẩu</p>
                        <form className={cx('boxInput')}>
                            <input
                                type="password"
                                className={cx('oldPass')}
                                id="oldPass"
                                name="oldPass"
                                placeholder="Nhập mật khẩu cũ"
                            />
                            <input
                                type="password"
                                className={cx('newPass')}
                                id="newPass"
                                name="newPass"
                                placeholder="Nhập mật khẩu mới (>6 kí tự)"
                            />
                            <input
                                type="password"
                                className={cx('confirmNewPass')}
                                id="confirmNewPass"
                                name="confirmNewPass"
                                placeholder="Nhập lại mật khẩu mới"
                            />
                            <div className={cx('boxBtnPopup')}>
                                <div className={cx('confirm-dl')}>Xác Nhận</div>
                                <div className={cx('cancel-dl')}>Hủy</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
