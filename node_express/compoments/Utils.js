exports.buildurl = buildurl = function(req,kv){
    //console.log(req.query);
    //console.log(kv);
    for (var p in req.query){
        if (kv.hasOwnProperty(p)){
            continue;
        } else {
            if (req.query[p].length == 0){
                continue;
            } else {
                kv[p] = req.query[p];
            }
        }
    }
    var querystr = "";
    for (var key in kv){
        //---------
        //---------
        var value = kv[key];
        if (value.length){
            if (querystr.length){
                querystr = querystr + '&';
            }
            querystr = querystr + key + '=' + encodeURIComponent(value);
        }
    }
    return '?' + querystr;
}


