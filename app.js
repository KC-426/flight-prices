const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sourceRoutes = require('./routes/source');
const authRoutes = require('./routes/auth')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use(sourceRoutes)
app.use('/auth', authRoutes)

mongoose
  .connect(
    'mongodb+srv://kuldeep:18330468@cluster0.qw8m0tp.mongodb.net/flight'
  )
  .then(result => {
    // console.log(result)
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
