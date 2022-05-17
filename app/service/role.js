
const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async getResource() {
    const { app } = this;
    const resources = await app.mysql.select('resource');
    return resources;
  }
  async setResource({ roleId, resourceIds }) {
    const { app } = this; // roleId =  1, resourceIds 1 2 3
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_resource WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < resourceIds.length; i++) {
        const resourceId = resourceIds[i];
        await conn.insert('role_resource', {
          role_id: roleId,
          resource_id: resourceId,
        });
      }
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    }
  }
  async getUser() {
    const { app } = this;
    const users = await app.mysql.select('user');
    return users;
  }
  async setUser({ roleId, userIds }) {
    const { app } = this; // roleId =  1, resourceIds 1 2 3
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_user WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i];
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: userId,
        });
      }
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    }
  }
}

module.exports = RoleService;
