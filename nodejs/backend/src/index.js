const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientsRouter = require('./routes/clientsRoute');
const techniciansRouter = require('./routes/techniciansRoute');
const ticketsRouter = require('./routes/ticketsRoute');

const app = express();

app.options('*', cors());
app.use(express.json());
app.use(clientsRouter);
app.use(techniciansRouter);
app.use(ticketsRouter);

// aspetto che il container di mongo sia su
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
console.log('Taking a break...');
pausecomp(10000);
console.log('Ten seconds later, ...');

var path = require('path');
global.appRoot = path.resolve(__dirname);

//connessione al db
mongoose.connect('mongodb://mongodb:27017/kronosDB').then(() => {
   console.log('Connected to DB');
}).catch(err => {
   console.log(err);
});

const server = app.listen(3000, () => {
   console.log('listening on http://localhost:3000');
});


const io = require('socket.io')(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-type,Accept,X-Custom-Header"],
      credentials: true
   }
});

exports.sendUpdatedClients = (data) => {
   io.emit('CLIENTS', data);
}

exports.sendUpdatedTechnicians = (data) => {
   io.emit('TECHNICIANS', data);
}

exports.sendUpdatedTickets = (data) => {
   io.emit('TICKETS', data);
}
