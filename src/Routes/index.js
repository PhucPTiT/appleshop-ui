import { Login, SignUp } from '~/pages/auth';
import Admin from '~/pages/admin';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/admin', component: Admin },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
