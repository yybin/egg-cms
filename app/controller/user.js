const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
const { sign } = require('jsonwebtoken');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  async captcha() {
    const { ctx } = this;
    const captcheObj = svgCaptcha.create(); // {text, data}
    ctx.session.captcha = {
      text: captcheObj.text,
      expires: new Date(Date.now() + 60 * 1000),
    } ;
    ctx.set('Content-type', 'image/svg+xml');
    ctx.body = captcheObj.data;
  }
  async checkCaptcha() {
    const { ctx } = this;
    const captcha = ctx.request.body.captcha;
    if (captcha === ctx.session.captcha.text && ctx.session.captcha.text.expires.getTime() > Date.now()) {
      ctx.body = 'captcha验证成功！';
    } else {
      ctx.body = '验证失败';
    }
  }
  async signup() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    const result = await service.user.signup(user);
    if (result.affectedRows > 0) {
      this.success('注册成功！');
    } else {
      this.error('注册失败');
    }
  }
  async signin() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const result = await service.user.signin(username, password);
    if (result && result.length > 0) {
      // Expected "payload" to be a plain object.
      const u = JSON.parse(JSON.stringify(result[0]));
      delete u.password;
      this.success(sign(u, this.config.jwtSecret, {
        expiresAt: new Date(Date.now() + 60 * 1000),
      }));
    } else {
      this.error('登录失败');
    }
  }
}

module.exports = UserController;
