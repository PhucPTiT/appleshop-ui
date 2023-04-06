import { createBrowserRouter } from 'react-router-dom';
import DefaultLayoutAd from '~/layouts/DefaultLayoutAd';
import Admin from '~/pages/admin';
import { Login } from '~/pages/auth';
import CategoryAd from '~/pages/categoryad';
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
        ],
    },
    {
        path: '/login',
        element: <Login />,
        children: [],
    },
]);

export { router };
