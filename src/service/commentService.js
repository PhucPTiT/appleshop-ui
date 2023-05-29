const { ServiceBase } = require('~/config/service-base');

export class CommentService extends ServiceBase {
    // view = async (params) => {
    //     const { userId } = params;
    //     return this.get(`/cart/user/${userId}`);
    // };
    // remove = async (params) => {
    //     const id = params;
    //     return this.delete(`/cart/${id}`);
    // };
    add = async (params) => {
        const { userId, productName, rating, comment } = params;
        return this.post(`/comment`, { userId, productName, rating, comment });
    };
    // removeAll = async (params) => {
    //     const id = params;
    //     return this.delete(`/cart/user/${id}`);
    // };
}
