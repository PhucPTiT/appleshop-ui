const { ServiceBase } = require('~/config/service-base');

export class ColorService extends ServiceBase {
    view = async () => {
        return this.get('/color');
    };
    edit = async (params) => {
        const { id, color } = params;
        return this.put(`/color/${id}`, { color });
    };
    remove = async (params) => {
        const id = params.id;
        return this.delete(`/color/${id}`);
    };
    add = async (params) => {
        const { color } = params;
        return this.post(`/color`, { color });
    };
}
