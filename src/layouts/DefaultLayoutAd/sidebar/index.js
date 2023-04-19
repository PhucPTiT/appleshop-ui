import SideBarItem from '~/components/SidebarItem';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FaMemory, FaLightbulb, FaArchive, FaUser, FaCommentDots, FaPalette } from 'react-icons/fa';

const cx = classNames.bind(styles);

function SidebarAd() {
    const ListItems = [
        { icon: FaLightbulb, name: 'Category', to: '/admin/category' },
        { icon: FaPalette, name: 'Color', to: '/admin/color' },
        { icon: FaMemory, name: 'Memory', to: '/admin/memory' },
        { icon: FaArchive, name: 'Product', to: '/admin/product' },
        { icon: FaUser, name: 'User', to: '/admin/user' },
        { icon: FaCommentDots, name: 'Comment', to: '/admin/comment' },
    ];
    return (
        <div className={cx('SidebarAd')}>
            {ListItems.map((item, index) => {
                return (
                    <SideBarItem key={index} iconLeft={item.icon} to={item.to}>
                        {item.name}
                    </SideBarItem>
                );
            })}
        </div>
    );
}

export default SidebarAd;
