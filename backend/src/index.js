const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientsRouter = require('./routes/clientsRoute');
const techniciansRouter = require('./routes/techniciansRoute');
const ticketsRouter = require('./routes/ticketsRoute');
const chatsRouter = require('./routes/chatsRoute');

const app = express();

app.options('*', cors());
app.use(express.json());
app.use(clientsRouter);
app.use(techniciansRouter);
app.use(ticketsRouter);
app.use(chatsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/kronosDB').then(() => {
   console.log('Connected to DB');
}).catch(err => {
   console.log(err);
});

const server = app.listen(3000, () => {
   console.log('listening on http://localhost:3000');
});

/*
const io = require('socket.io')(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-type,Accept,X-Custom-Header"],
      credentials: true
   }
});

exports.sendUpdatedApplications = (data) => {
   io.emit('APPLICATIONS', data);
}

exports.sendUpdatedUniversities = (data) => {
   io.emit('UNIVERSITIES', data);
}
*/
