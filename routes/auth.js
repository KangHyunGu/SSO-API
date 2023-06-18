const router = new (require('@koa/router'))();
const authCtrl = require('../controller/auth-ctrl');

router.post('/join', authCtrl.join);
router.post('/login', authCtrl.login);

// 페이지 최초 로딩시 socketID로 토근과 회원정보 반한
router.post('/auth', authCtrl.auth);

// TODO: 토큰검사 -> 유효화면 처리
router.post('/logout', authCtrl.logout);

module.exports = router;