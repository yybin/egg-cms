/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_zhuche';

  // add your middleware config here
  config.middleware = [ 'auth' ];
  config.auth = {
    authUrls: [
      '/api/role/getUser',
      '/api/role/setUser',
    ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  userConfig.jwtSecret = 'wuche';
  userConfig.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'SH9500ast',
      database: 'cms',
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
