import { createBrowserRouter } from 'react-router-dom';
import DefaultLayoutAd from '~/layouts/DefaultLayoutAd';
import Admin from '~/pages/admin';
import { Login, SignUp } from '~/pages/auth';
import CategoryAd from '~/pages/categoryad';
import ProductAd from '~/pages/productad';
const router = createBrowserRouter([
    {
        path: '/',
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
]);

export { router };
