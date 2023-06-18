const crypto = require('crypto');
const rules = require('../lib/validateRules');
module.exports = (pw) => {
	const valid = rules.checkRules(pw, rules.password());
	if(valid !== true) {
		throw new Error(valid);
	}
	return crypto.createHash('sha256').update(pw).digest('base64');
}