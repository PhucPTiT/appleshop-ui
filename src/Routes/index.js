import { Login, SignUp } from '~/pages/auth';
const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
