const rules = {
	checkRules(v, rulesArr) {
		for(const fn of rulesArr){
			const check = fn(v);
			if(check !== true) {
				return check
			}
		}
		return true;
	},
	min(len) {
		return v => !!v ? v.length >= len || `${len}자 이상입력하세요.` : true;
	},
	required(msg = `이 필드는 필수입력입니다.`) {
		return v => !!v || msg;
	},
	pattern(pattern, msg = '형식에 맞게 입력하세요.') {
		return v => !!v ? pattern.test(v) || msg : true;
	},
	matchValue(origin, msg = '비밀번호가 일치하지 않습니다.') {
		return v => v === origin || msg;
	},
	password(reqMsg = '비밀번호는 필수 입력입니다.', exrMsg = "영문자 숫자 특수문자를 포함해야 합니다.") {
		const pattern = /^.*(?=^.{5,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&])/
		return [
			rules.required(reqMsg),
			rules.pattern(pattern, exrMsg)
		]
	},

	email(required = true, reqMsg = '이메일은 필수 입력입니다.', exrMsg = '이메일 형식에 맞게 입력하세요.') {
		return [
			required ? rules.required(reqMsg) : undefined,
			rules.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, exrMsg)
		]
	},
	name(required = true, len=2, reqMsg = '이름은 필수입력입니다.') {
		return [
			required ? rules.required(reqMsg): undefined,
			rules.min(len),
		]
	},
	phone(required = true, reqMsg = '전화번호는 필수 입력입니다.', exrMsg = '전화번호 형식에 맞게 입력하세요.') {
		return [
			required ? rules.required(reqMsg): undefined,
			rules.pattern(/^(\d{2,3}-)?\d{3,4}-\d{4}$/, exrMsg)
		]
	}
}

module.exports = rules;