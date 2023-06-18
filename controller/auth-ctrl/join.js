const rules = require('../../lib/validateRules');

module.exports = async (ctx, next) => {
	const form = {
		mb_email : (ctx.request.body.mb_email || '').trim(),
		mb_password : (ctx.request.body.mb_password || '').trim(),
		mb_name : (ctx.request.body.mb_name || '').trim(),
		mb_hp : ctx.request.body.mb_hp?.trim() || undefined, // 널 허용
	}

	const mb = await $DB.member.create(form);

	if(!mb) {
		throw new Error('회원 생성중 오류가 발생했어요');
	}

	return true;
}