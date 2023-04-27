import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, createBrowserRouter } from 'react-router-dom';
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
import jwt_decode from 'jwt-decode';

function PrivateRoute({ element: Element, ...rest }) {
    const [loading, setLoading] = useState(true); // Tạo biến loading
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            if (decoded.role === 1) {
                setIsAdmin(true);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            <Route {...rest} element={<Element />} />
        </Routes>
    );
}

const router = createBrowserRouter([
    {
        path: '/admin/*',
        element: <PrivateRoute element={DefaultLayoutAd} />,
        children: [
            {
                path: 'category',
                element: <CategoryAd />,
                // loader: ProductAd,
            },
            {
                path: '',
                element: <Admin />,
                // loader: ProductAd,
            },
            { path: 'memory', element: <MemoryAd /> },
            { path: 'color', element: <ColorAd /> },
            { path: 'product', element: <ProductAd /> },
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
