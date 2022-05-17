'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/signup', controller.user.signup); // 注册上去
  router.post('/signin', controller.user.signin); // 登录进去
  router.get('/api/captcha', controller.user.captcha);
  router.post('/api/checkCaptcha', controller.user.checkCaptcha);
  router.resources('user', '/api/user', controller.user);
  router.resources('role', '/api/role', controller.role);
  router.resources('resource', '/api/resource', controller.resource);
  router.resources('resource', '/api/roleUser', controller.roleUser);
  router.resources('resource', '/api/roleResource', controller.roleResource);
  router.get('/api/role/getResource', controller.role.getResource); // 获取所有资源
  router.post('/api/role/setResource', controller.role.setResource); // 设置角色的资源的关系
  router.get('/api/role/getUser', controller.role.getUser); // 获取所有的用户
  router.post('/api/role/setUser', controller.role.setUser); // 设置角色和用户的关系
};

/**
 * 黑白名单
*/