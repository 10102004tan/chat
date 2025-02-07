'use strict';

class SocketService {
    connection(socket){
        console.log('🔥: User connected',socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) _userSocketMap[userId] = socket.id;

        _io.emit("getOnlineUsers", Object.keys(_userSocketMap));
        console.log('🔥: Online Users',Object.keys(_userSocketMap));

        socket.on('disconnect', () => {
			socket.disconnect();
			console.log('🔥: User disconnected',socket.id);
            delete _userSocketMap[userId];
            _io.emit("getOnlineUsers", Object.keys(_userSocketMap));
		});
    }
}
module.exports = new SocketService();