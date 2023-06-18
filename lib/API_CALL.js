module.exports = function (fn) {
	return async function (ctx) {
		try {
			ctx.body = {
				success: true,
				data: await fn(ctx),
			};
		} catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.trace(e);
			}
			const message = (e.original ? e.original.sqlMessage : e.message).replace('Validation error: ', '');
			$LOG.error(`${ctx.path} : ${message}`);
			ctx.body = {
				success: false,
				data: message,
			}
		}
	}
}