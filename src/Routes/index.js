import { createBrowserRouter } from 'react-router-dom';
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

const router = createBrowserRouter([
    {
        path: '/admin/*',
        element: <DefaultLayoutAd />,
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
