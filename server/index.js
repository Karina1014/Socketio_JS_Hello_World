import express from 'express'
import htpp from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = htpp.createServer(app)
const io = new SocketServer(server)

io.on("connection", socket => {
    console.log(socket.id)

    socket.on("message", (body) =>  {
        socket.broadcast.emit("message",{
            body,
            from: socket.id.slice(6),
        });
    });
});

server.listen(4000);
console.log('server on port', 4000);