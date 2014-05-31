
module.exports = function(req,cse_res){
    cse_res.isdebug = req.query.isdebug;

    ParseBsDebug(cse_res,req);

};

function ParseBsDebug(obj,req) {
    if (!obj){
        return;
    }

    for(var i=0; i<obj.retNum;++i) {
        ParseBsAdjustDebug(obj['result' + i ]);
    }
}


function ParseBsAdjustDebug(doc) {
    if (!doc.debugInfo){
        return;
    }

    cmpdebug = {};
    cmpdebug.weightval = []; // 原始权重
    cmpdebug.weightset = []; // 生效权重

    // bweight
    cmpdebug.weightval.push(parseInt(doc.weightInfo.bweight));
    cmpdebug.weightset.push(parseInt(doc.weightInfo.bweight));

    for (var j=0;j < doc.debugInfo.docDebugLog.length;++j){
        //adjustWei[122] = bweight[8721]*adjustvalue[47.000]*boost[0.030]*0.01
        var res = doc.debugInfo.docDebugLog[j].match(/adjustWei\[(\d*)\] = bweight.*?adjustvalue\[(.*?)\]/);
        if (res){
            cmpdebug.weightset.push(parseInt(res[1]));
            cmpdebug.weightval.push(parseInt(res[2]));
            continue;
        }
    }
    doc.debugInfo.cmpdebug = cmpdebug;
}
