var SearchQuery =    require ('../models/SearchQuery.js');
var BuildPageUrl =   require ('../models/BuildPageUrl.js');
var ParseAsDebug =   require ('../models/ParseAsDebug.js');


module.exports = function(app){
   app.get(/^.*$/,function(req,res,next){
        res.locals = res.locals || {};
        res.locals.UserPower = {};
        res.locals.error = "";
        next();
    });
    
    app.get(/^.*$/,function(req,res){

        var sq = new SearchQuery(req.query);
        sq.Query(req.query.host,req.query.port,function(error,cse_res){
            if (error){
                res.locals.error = error.toString();
                return res.render("search",{ 
                    title : "搜索",
                       reqquery : req.query,
                       cse_res : {},
                });
            } else {
                BuildPageUrl(req,cse_res);
                ParseAsDebug(req,cse_res);

                return res.render("search",{ 
                    title : "搜索",
                       reqquery : req.query,
                       cse_res : cse_res,
                });
           }
        });
    });
};
