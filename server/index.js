import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

let clients = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.id);
  clients.push(socket);

  socket.on("disconnect", () => {
    clients = clients.filter((client) => client.id !== socket.id);
    console.log("Usuario desconectado:", socket.id);
  });

  socket.on("sendNotification", (data) => {
    console.log("Enviando notificación:", data);
    clients.forEach((client) => {
      client.emit("notification", data);
    });
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      body: data.body, // Accedemos a data.body en lugar de data completo
      from: socket.id.slice(6),
    });
  });

});

server.listen(4000);
console.log("Server is running on port", 4000);
