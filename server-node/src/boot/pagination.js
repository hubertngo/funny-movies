export default function (app) {
  const remotes = app.remotes();

  remotes.after('*.find', function (ctx, next) {
    let filter = {};

    if (ctx.args && ctx.args.filter) {
      filter = ctx.args.filter.where;
    }

    const { limit, skip = 0 } = ctx.req.query.filter ? JSON.parse(ctx.req.query.filter) : {};

    this.count(filter, (err, count) => {
      if (err) {
        return next(err);
      }
      const dataSend = {
        total: count,
        skip,
        data: ctx.result,
      };

      if (limit) {
        dataSend.limit = limit;
      }

      ctx.result = dataSend;
      next();
    });
  });
}
