import { useEffect, useState } from 'react';
import { Navigate, Route, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import DefaultLayoutAd from '~/layouts/DefaultLayoutAd';
import Admin from '~/pages/admin';
import { Login, SignUp } from '~/pages/auth';

import CategoryAd from '~/pages/categoryad';
import ColorAd from '~/pages/colorAd';
import Home from '~/pages/home';
import Iphone from '~/pages/iphone';
import MemoryAd from '~/pages/memoryad';
import ProductAd from '~/pages/productad';

function PrivateRoute({ element: Element, ...rest }) {
    const [session, setSession] = useState(false); // sử dụng state để lưu trạng thái session
    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (username) {
            setSession(true);
        }
    }, []);
    // Kiểm tra xem session có tồn tại không
    if (!session) {
        return <Navigate to="/login" />;
    }

    // Trả về element của route với props tương ứng
    return <Route {...rest} element={<Element />} />;
}

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <PrivateRoute element={DefaultLayoutAd} />,
        children: [
            {
                path: '/admin/category',
                element: <CategoryAd />,
                // loader: ProductAd,
            },
            {
                path: '/admin',
                element: <Admin />,
                // loader: ProductAd,
            },
            { path: '/admin/memory', element: <MemoryAd /> },
            { path: '/admin/color', element: <ColorAd /> },
            { path: '/admin/product', element: <ProductAd /> },
        ],
    },
    {
        path: '/login',
        element: <Login />,
        children: [],
    },
    {
        path: '/signup',
        element: <SignUp />,
        children: [],
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/iphone',
                element: <Iphone />,
            },
        ],
    },
]);

export { router };
