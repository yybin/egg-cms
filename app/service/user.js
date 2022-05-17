
const BaseService = require('./base');

class UserService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  async list(pageNum, pageSize, where) {
    const { app } = this;
    const data = await this.app.mysql.select(this.entity, {
      where,
      order: [[ 'id', 'asc' ], [ 'username', 'asc' ]],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const resources = await app.mysql.query(`select resource.* from resource
      inner join role_resource rr  on resource.id = rr.resource_id
      inner join role_user ru on rr.role_id = ru.role_id
      where ru.user_id = ?`, [ user.id ]);
      user.resources = resources;
    }
    const total = await this.app.mysql.count(this.entity, where);
    return { data, total };
  }
  async signup(user) {
    return await this.app.mysql.insert('user', user);
  }
  async signin(username, password) {
    return await this.app.mysql.select('user', {
      where: { username, password },
      limit: 1,
    });
  }
}

module.exports = UserService;
