require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000',
    'http://localhost:3001',
    // 'http://eilyina.nomoredomains.rocks',
    // 'https://eilyina.nomoredomains.rocks',
    'http://api.eilyina.nomoredomains.rocks',
    'https://api.eilyina.nomoredomains.rocks'],

  methods: 'GET,PUT,PATCH,POST,DELETE',
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(require('./routes/index'));
// app.use(require('./middlewares/errorHandler'));

app.listen(3000, () => {
  console.log('подключен');
});
