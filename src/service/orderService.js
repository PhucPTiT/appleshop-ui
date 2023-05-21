const { ServiceBase } = require('~/config/service-base');

export class OrderService extends ServiceBase {
    view = async (params) => {
        const { userId } = params;
        return this.get(`/order/user/${userId}`);
    };
    add = async (params) => {
        return this.post(`/order`, params);
    };
}
