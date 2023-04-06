const { ServiceBase } = require('~/config/service-base');

export class CategoryService extends ServiceBase {
    view = async () => {
        return this.get('/category');
    };
    edit = async (params) => {
        const { id, name, code } = params;
        return this.put(`/category/${id}`, { name, code });
    };
}
