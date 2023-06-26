const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const moviesRouter = require('./src/routes/moviesRoutes');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/movies',moviesRouter);

app.use((req, res) => {
   res.status(404).send({url: req.originalUrl + 'not found'});
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
