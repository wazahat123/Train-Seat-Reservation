var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const pool = require('./middlewares/connection')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const createAdminTable = `CREATE TABLE IF NOT EXISTS admin (
  admin_id serial PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);`;

const createUserTable = `create table if not exists users(
  user_id varchar(20) primary key,
  username varchar(50) not null,
  password varchar(50) not null,
  email varchar(100) not null
);`;

const createTrainTrable = `create table if not exists trains(
  train_id varchar(20) primary key,
  train_name varchar(50) not null,
  souce varchar(100) not null,
  dest varchar(100) not null,
  atas date,
  atad date
);`

function createTables(){
  pool.query(createAdminTable, (err, res)=>{
    if(err){
      console.error(err);
    }else{      
      console.log('Admin table created successfully')
    }
  });

  pool.query(createTrainTrable, (err, res)=>{
    if(err){
      console.error(err);
    }else{
      console.log('Train table created successfully')
    }
  });

  pool.query(createUserTable, (err, res)=>{
    if(err){
      console.error(err);
    }else{
      console.log('User table created successfully')
    }
  });
}

createTables()

module.exports = app;
