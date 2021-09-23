// require('dotenv').config()
const express = require('express')
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


// Connect to mongodb
const URI = 'mongodb://localhost:27017/khaliddb'
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var index = require('./routes/user');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT =  4000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});

