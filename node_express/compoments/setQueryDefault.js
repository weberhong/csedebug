var check = function(req,key,value){
    if (req.query[key] && req.query[key].length){
        return;
    }
    req.query[key] = value;
}

module.exports = function(req,res,next){

    check(req,'query','');
    check(req,'pn','0');
    check(req,'rn','10');
    check(req,'host','127.0.0.1');
    check(req,'port','7788');

    next();
}
