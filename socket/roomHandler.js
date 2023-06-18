module.exports = (io, socket) => {
    socket.on('room:join', (roomName) => {
        console.log('room:join', socket.id, '->', roomName);
        socket.join(roomName);
    })

    socket.on('room:joins', (roomNames) => {
        roomNames.forEach(roomName => {
            console.log('room:joins', socket.id, '->', roomName);
            socket.join(roomName);
        });
    })

    socket.on('room:leave', (roomName) => {
        console.log('room:leave', socket.id, '->', roomName);
        socket.join(roomName);
    })

    socket.on('room:leaves', (roomNames) => {
        roomNames.forEach(roomName => {
            console.log('room:leaves', socket.id, '->', roomName);
            socket.join(roomName);
        });
    })
}