var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// 导入的connet-redis是函数，将session放入即可
const RedisStore = require('connect-redis')(session);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 自己定义的路由
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//deal log
const ENV = process.env.NODE_ENV;
if(ENV != 'production'){
  app.use(logger('dev'));
}else{
  const logFileName = path.join(__dirname, 'logs' , 'access.log');
  const writeStream = fs.createWriteStream(logFileName,{
    flags: 'a'
  })
  app.use(logger('combined'),{
    stream: writeStream
  })
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//export redis  setting connect width server
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})

//deal session
app.use(session({
  secret: '#hhjdA165_', // 传入的密匙
  cookie: {
    // path: '/',      //默认参数
    // httpOnly: true, //默认参数
    maxAge: 24 * 60 * 60 * 1000    //用maxAge直接写入最大储存时间
  },
  store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// 自己定义路由部分的处理  传入父级路由地址
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // develop env  print err , other  print  {}
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
