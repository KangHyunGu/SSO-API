module.exports = {
	join : $API_CALL(require('./join')),
	login : $API_CALL(require('./login')),
	auth : $API_CALL(require('./auth')),
	logout: $API_CALL(require('./logout')),
}