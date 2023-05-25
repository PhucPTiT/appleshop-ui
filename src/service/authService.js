const { ServiceBase } = require('~/config/service-base');

export class AuthService extends ServiceBase {
    register = async (params) => {
        const { fullName, userName, password } = params;
        return this.post('signup', { fullName, userName, password });
    };
    register2 = async (params) => {
        const { userName, password } = params;
        return this.post('login', { userName, password });
    };

    view = async (params) => {
        const { userId } = params;
        return this.get(`/user/${userId}`);
    };
}
