const genPassword = require('../../lib/genPassword');
const jwt = require('../../plugins/jwt');
module.exports = async (ctx) => {
	const mb_email = (ctx.request.body.mb_email || '').trim();
	const mb_password = (ctx.request.body.mb_password || '').trim();

	const member = await $DB.member.findOne({
		where: {
			mb_email,
			mb_password: genPassword(mb_password)
		}
	})

	if (!member) {
		throw new Error("일치하는 회원이 없습니다.")
	}

	const token = jwt.genToken(member);
	return {member, token};
}