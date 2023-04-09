const { ServiceBase } = require('~/config/service-base');

export class ProductService extends ServiceBase {
    view = async () => {
        return this.get('/product');
    };
    edit = async (params) => {
        const { id, name, code, description, imgLink, categoryCode } = params;
        return this.put(`/product/${id}`, { name, code, description, imgLink, categoryCode });
    };
    remove = async (params) => {
        const id = params.id;
        return this.delete(`/product/${id}`);
    };
    add = async (params) => {
        const { name, code, description, imgLink, categoryCode } = params;
        return this.post(`/product`, { name, code, description, imgLink, categoryCode });
    };
}
