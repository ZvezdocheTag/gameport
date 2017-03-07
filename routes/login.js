
const passport = require('koa-passport');

exports.post = async function(ctx, next) {

  // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
  // it returns the middleware to delegate
  await passport.authenticate('local', async function(user, info) {
    // only callback-form of authenticate allows to assign ctx.body=info on 401
    // in passport.authenticate callback: this == global, so we need a wrapper to access context

    if (user === false) {
      ctx.status = 401;
      ctx.body = { error: info };
    } else {
      ctx.body = {
        user: user.getPublicFields()
      };
      await ctx.login(user);
    }
  })(ctx, next);

};
