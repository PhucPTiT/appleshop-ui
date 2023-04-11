import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import DefaultLayoutAd from '~/layouts/DefaultLayoutAd';
import Admin from '~/pages/admin';
import { Login, SignUp } from '~/pages/auth';
import CategoryAd from '~/pages/categoryad';
import Home from '~/pages/home';
import ProductDetailAd from '~/pages/productDetailad';
import ProductAd from '~/pages/productad';
const router = createBrowserRouter([
    {
        path: '/admin',
        element: <DefaultLayoutAd />,
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
            { path: '/admin/product', element: <ProductAd /> },
            { path: '/admin/productDetail', element: <ProductDetailAd /> },
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
        ],
    },
]);

export { router };
