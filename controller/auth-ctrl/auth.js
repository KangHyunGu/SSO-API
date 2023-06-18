const jwt = require('../../plugins/jwt');

module.exports = async (ctx, next) => {
	const {socketId} = ctx.request.body
	if(!socketId) {
		throw new Error('소켓 ID가 없습니다.');
	}

	let token = await $DB.token.findByPk(socketId, {
		attributes : ['token']
	})

	if(!token) {
		throw new Error('로그인 되어있지 않음');
	}
	token = token.token;

	const encoded = jwt.verify(token);

	const member = await $DB.member.findByPk(encoded.id);
	return {token, member};
}