import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import path from 'path';
import router from './router/router.js';
import session from 'express-session';

const sessionLength = (1000 * 60 * 60 * 24) * 7; // 1 day

const __dirname = path.resolve();
const port = process.env.PORT || 5500;

const app = express(); 
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

app.set('view engine', 'hbs');  
app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use(session({
  name: 'chatsession',
  secret: "chatsecretsessiondata",
  saveUninitialized:true,
  cookie: { maxAge: sessionLength },
  resave: false
}));



io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  // io.emit('history', history)

  socket.on("setUsername", (username) => {
    socket.username = username;
    socket.emit("userSet", { username });
  });

  socket.on('chatMessage', (data) => {
    // while (history.length > historySize) {
    //   history.shift()
    // }
    // history.push(message)

    const { message, senderId } = data;
    const username = socket.username;
    const isFromSelf = senderId === socket.id;
    const chatMessage = message;
    const chatUsername = username;

    console.log(chatMessage)

    io.emit('chatMessage', { 
      message: chatMessage,
      username: chatUsername,
      isFromSelf,
      senderId })
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  })
})



server.listen(process.env.PORT || port, () => {
  console.log('Example app listening on port 5500!');
});

app.engine('hbs',
handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: [
      path.join(__dirname, 'views', 'partials')
    ]
}));

app.use('/', router);