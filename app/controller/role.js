const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async getResource() {
    const { ctx, service } = this;
    const resources = await service.role.getResource();
    const rootMenus = [];
    const map = {};
    resources.forEach(resource => {
      resource.children = [];
      map[resource.id] = resource; // 把资源的id和资源的队形关系存放到了map中
      if (resource.parent_id === 0) { // 根节点
        rootMenus.push(resource);
      } else {
        map[resource.parent_id].children.push(resource);
      }
    });
    ctx.body = rootMenus;
  }
  async setResource() {
    const { ctx, service } = this;
    const body = ctx.request.body; // {roleId:1, resoucesIds: [1,2,3]}
    await service.role.setResource(body);
    this.success('授权成功！');
  }
  async getUser() {
    const { ctx, service } = this;
    const users = await service.role.getUser();
    ctx.body = users;
  }
  async setUser() {
    const { ctx, service } = this;
    const body = ctx.request.body; // {roleId:1, userIds: [1,2,3]}
    await service.role.setUser(body);
    this.success('授权成功！');
  }
}

module.exports = RoleController;
