
const Service = require('egg').Service;

class BaseService extends Service {
  async list(pageNum, pageSize, where) {
    const data = await this.app.mysql.select(this.entity, {
      where,
      order: [[ 'id', 'asc' ], [ 'username', 'asc' ]],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    const total = await this.app.mysql.count(this.entity, where);
    return { data, total };
  }
  async create(entity) {
    const result = await this.app.mysql.insert(this.entity, entity);
    return result.affectedRows > 0;
  }
  async update(entity) {
    // update user set username =?, password=?, where id=?
    const result = await this.app.mysql.update(this.entity, entity);
    return result.affectedRows > 0;
  }
  async destroy(id) {
    // update user set username =?, password=?, where id=?
    const result = await this.app.mysql.delete(this.entity, { id });
    return result.affectedRows > 0;
  }
}

module.exports = BaseService;
