const { ServiceBase } = require('~/config/service-base');

export class CommentService extends ServiceBase {
    remove = async (params) => {
        const id = params;
        return this.delete(`/comment/${id}`);
    };
    add = async (params) => {
        const { userId, productName, rating, comment } = params;
        return this.post(`/comment`, { userId, productName, rating, comment });
    };
    removeReply = async (params) => {
        const id = params;
        return this.delete(`/reply/${id}`);
    };
    changeCmt = async (params) => {
        const { id, comment } = params;
        return this.put(`/comment/${id}`, { comment });
    };
    changeRep = async (params) => {
        const { id, reply } = params;
        return this.put(`/reply/${id}`, { reply });
    };
}
