const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/testRouter');
const {mainLimiter, testLimiter} = require("./rateLimits");
const helmet = require('helmet');
const cronJobs = require('./cronJobs');
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// this is so the express-rate-limit knows which ip is hitting it, if we have a proxy in front of our request.. we usually do
  // then the rate limiter will get the proxy, not our ip, so it can't track us!, we need to specify the number of proxies below
  // since we self host on coolify, there is usually 1 proxy in front, we can test this with
  // /test/ip route we created for this
app.set('trust proxy', 1);

const validApiKeys = [process.env.API_KEY];

// Middleware for validating API keys. put API_KEY in .env file. this is one we generate for simple testing
function validateApiKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
}
// axios request with api key above look something like this
  /*
  const URL = `${process.env.API_LINK}/lottery/scrapeLottery`;
  const headers = {
      'x-api-key': process.env.API_KEY
  }
  await axios.get(URL, {headers})
  */



//logs request to server
if (app.get('env') === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

//cors settings
corsOptions = {
  origin: ['http://localhost:5173','http://localhost:4173'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//cors not enabled by default
app.use(cors(corsOptions))


//if we want to customize rate limits on routes, put the routes above the limiter middleware, otherwise leave below for main limiter
//when using a limiter it goes by ip, if we use a proxy it can't get the users direct ip unless we tell express how many proxies are in front of it
//so we must try our ip route in /test/ip -> this tells our ip, if we don't see it then we know were on a proxy and we should set 'trust proxy' below and test again
//at the top of the page
//app.set('trust proxy', number of proxies)

app.use(mainLimiter)
app.use('/',validateApiKey, indexRouter);
app.use('/test',validateApiKey, testRouter);
app.use('/users',validateApiKey, usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//run cron jobs
cronJobs.initScheduledJobs();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// myLogger is a custom version of logger, we don't need it
// app.use(myLogger)
/* function myLogger(req, res, next) {
  console.log("Request IP: " + req.ip);
  console.log("Request Method: " + req.method);
  console.log("Request date: " + new Date());

  next(); // THIS IS IMPORTANT!
} */
module.exports = app;
