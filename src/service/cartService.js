const { ServiceBase } = require('~/config/service-base');

export class CartService extends ServiceBase {
    // view = async () => {
    //     return this.get('/category');
    // };
    // edit = async (params) => {
    //     const { id, name, code } = params;
    //     return this.put(`/category/${id}`, { name, code });
    // };
    // remove = async (params) => {
    //     const id = params.id;
    //     return this.delete(`/category/${id}`);
    // };
    add = async (params) => {
        const { userId, productId, memory, color } = params;
        return this.post(`/cart`, { userId, productId, memory, color });
    };
}
