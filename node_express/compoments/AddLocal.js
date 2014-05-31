module.exports = function(req,res,next){

    res.locals.paths = req.paths;

    var err = req.session.error;
    if (err && err.length){
        res.locals.error = err;
    } else {
        res.locals.error = null;
    }
    req.session.error = null;

    next();
}
