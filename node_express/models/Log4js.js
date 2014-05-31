var log4js = require('log4js');

log4js.configure('config/Log4jsConf.json');

exports.Logger = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('DEBUG');
    return logger;
};

exports.Middleware = function(){
    return log4js.connectLogger(this.Logger('normal'),{level:'auto',format:
        ':status :response-time(ms) :method :url'});
};
