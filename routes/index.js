exports.get = async function(ctx, next) {
    ctx.body = ctx.render('index');
};
