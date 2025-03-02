import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log(socket.id)

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            body: data.body,  // Accedemos a data.body en lugar de data completo
            from: socket.id.slice(6)
        })
    })
})

server.listen(4000)
console.log('Server is running on port', 4000)
