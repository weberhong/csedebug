var Utils = require('../compoments/Utils.js');


module.exports = function(req,cse_res){
    var maxPage = 7;
    var obj = cse_res;
    var dispNum = obj.dispNum || 0;
    var pagenum = (dispNum-1) / req.query.rn;
    var page_begin = parseInt(req.query.pn) - maxPage;
    var page_end = parseInt(req.query.pn) + maxPage;
    if(page_begin < 0){
        page_begin = 0;
    }
    if(page_end > pagenum){
        page_end = pagenum;
    }
    // 起始页比较大,补充一个起始页
    if (page_begin > 0)
    {
        var url = Utils.buildurl(req,{'pn' : 0});
        cse_res.firstPageUrl = { name : 0, url : url};
    }
    cse_res.pagelist = [];
    for(var i=page_begin;i<=page_end;i++){
        if(i == req.query.pn){
            //当前页,不可点击
            cse_res.pagelist.push( { name : i , url : "" });
        }
        else
        {
            var url = Utils.buildurl(req,{'pn' : i.toString()});
            //echo "<a href='".$url."'>[".$i."]</a>";
            cse_res.pagelist.push( { name : i , url : url });
        }
    }
}
