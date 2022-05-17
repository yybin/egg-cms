const { verify } = require('jsonwebtoken');

function verifyToken(token, secret) {
  return new Promise(function(resolve, reject) {
    verify(token, secret, function(err, payload) {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}

module.exports = (options, app) => {
  return async function(ctx, next) {
    // 在此处我要进行权限判断
    const authUrls = options.authUrls;
    if (authUrls.includes(ctx.url)) {
      const authorization = ctx.get('authorization');
      if (authorization) {
        console.log(11);
        try {
          const user = await verifyToken(authorization, app.config.jwtSecret);
          ctx.session.user = user;
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = 'TOKEN验证失败';
        }
      } else {
        ctx.status = 401;
        ctx.body = '没有权限';
      }
    } else {
      await next();
    }
  };
};
