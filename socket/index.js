const config = require('../config');
const {Server} = require('socket.io');
const redisAdapter = require('socket.io-redis');
const { instrument } = require("@socket.io/admin-ui");
const roomHandler = require('./roomHandler');
const ssoHandler = require('./ssoHandler');

module.exports = function(webServer){
    const io = new Server(webServer, {
        cors: {
            origin: ["https://admin.socket.io", "*"],
            credentials: true 
        }
    });
    const redisClient = redisAdapter(config.REDIS);
    io.adapter(redisClient);

    //socket.io admin-ui 인증처리
    instrument(io, {
        namespaceName: '/admin',
        auth: {
            type: 'basic',
            username: 'ezcode',
            password: '$2a$12$AmTvDr8qDy3X6Bc5LdAyw./XL7MB/W8XydZPKx.YgFScovItUQf9u'
        },
    })

    io.on('connection', socket => {
    roomHandler(io, socket);
    ssoHandler(io, socket);
    
    console.log('Connected=>', socket.id);
    socket.on('disconnect', () => {
        console.log('Disconnect=>', socket.id);
    });
    if(process.env.NODE_ENV == 'development'){
        socket.onAny((event, ...args) => {
            console.log('Socket', event, ...args);
        })
    }
    })

  
}