import { Login, SignUp } from '~/pages/auth';
import { Products } from '~/pages/admin';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/admin/products', component: Products },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
