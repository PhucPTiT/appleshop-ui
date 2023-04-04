const { ServiceBase } = require('~/config/service-base');

export class CategoryService extends ServiceBase {
    view = async () => {
        return this.get('/category');
    };
}
