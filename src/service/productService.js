const { ServiceBase } = require('~/config/service-base');

export class ProductService extends ServiceBase {
    view = async () => {
        return this.get('/product');
    };
}
