
const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error,
    };
  }
  async index() {
    const { service } = this;
    const { pageNum, pageSize, ...where } = this.ctx.query; // 从查询字符串获得参数
    const data = await service[this.entity].list(isNaN(pageNum) ? 1 : parseInt(pageNum), isNaN(pageSize) ? 10 : parseInt(pageSize), where);
    this.success(data);
  }
  async create() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    const result = await service[this.entity].create(entity);
    result ? this.success('success') : this.error('创建失败');
  }
  async update() { // api/user/1
    const { ctx, service } = this;
    const entity = ctx.request.body;
    const id = ctx.params.id;
    entity.id = id;
    const result = await service[this.entity].update(entity);
    result ? this.success('success') : this.error('更新失败');
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const result = await service[this.entity].destroy(id);
    result ? this.success('success') : this.error('删除失败');
  }
}

module.exports = BaseController;
