module.exports = async (ctx) => {
    const socketId = ctx.request.body;
    if(!socketId) {
        throw new Error('socket ID가 존재하지 않습니다.');
    }

    // DB 에서 접속한 token 정보 제거
    const row = await $DB.token.destroy({where : socketId});
    return row == 1;
}