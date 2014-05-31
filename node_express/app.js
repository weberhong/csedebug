
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var particals = require('express-partials');
var flash = require('connect-flash');
var setQueryDefault = require('./compoments/setQueryDefault.js');
var Log4js = require('./models/Log4js.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 8300);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(particals());
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Log4js.Middleware());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(setQueryDefault);
app.use(flash());
app.use(function(req,res,next){
    res.locals.username = req.session.user;

    var err = req.flash('flasherror');
    if (err && err.length){
        res.locals.flasherror = err;
    } else {
        res.locals.flasherror = null;
    }
    var succ = req.flash('success');
    if (succ && succ.length){
        res.locals.success = succ;
    } else {
        res.locals.success = null;
    }

    /*
    req.session.error = null;
    req.session.success = null;
    */

    next();
});
app.use(app.router);

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
