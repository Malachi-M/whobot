var set = require('set');
var util = require('util');

module.exports = function(options) {
    var rooms = {};
    return function(socket, next) {
        socket
            .on('message', function(message) {
                if (!message || !socket.room || !rooms[socket.room]) return;

                message = message.trim().toLowerCase();
                if (message === "/time" || message === "/currenttime" || message === "/millertime") {

                    socket.nsp.in(socket.room).emit('announce',
                        util.format("server time is: %d", Date.now()));
                }
            })
        next();
    };
};