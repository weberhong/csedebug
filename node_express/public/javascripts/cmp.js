function drawCmpBar(cmplist) {

    var cmpdebuglist = [];
    for (var i=0;i<cmplist.length;++i){
        doc = cmplist[i];
        var cmpdebug = $('#'+doc.resultkey).data("cmpdebug");
        if (cmpdebug) {
            cmpdebuglist.push(cmpdebug);
        }
    }

    var minbweight = 10000;
    for (i=0;i<cmpdebuglist.length;i++){
        var cmpdebug = cmpdebuglist[i];

        // 服务端解析第一个是bweight
        var bweight = cmpdebug.weightval[0];
        if (bweight < minbweight) {
            minbweight = bweight;
        }
    }
    bwbase = minbweight - 500;

    for (i=0;i<cmpdebuglist.length;i++){
        var cmpdebug = cmpdebuglist[i];
        cmpdebug.weightset[0] = (cmpdebug.weightval[0]-bwbase);
    }

    var bar_data = [];
    var colorlist = ["#FF8888","#5555FF","#66FF66"];
    for (i=0;i<cmpdebuglist.length;i++){
        var cmpdebug = cmpdebuglist[i];
        doc = cmplist[i];
        bar_data.push({
            color : colorlist[i],
            value : cmpdebug.weightset,
            name  : doc.title,
        });
    }

    var labelsArray = [];
    for (i=0;i<cmpdebuglist[0].weightset.length;i++){
        labelsArray.push("field"+i);
    }
    labelsArray[0] = "bweight";

    var chart = new iChart.ColumnMulti2D({
        render : 'cmpbarchart',
        data: bar_data,
        labels : labelsArray,
        title : '相关性调权情况',
        subtitle : '你们感受一下',
        width : 1024,
        height : 1000,
        background_color : '#ffffff',
        //column_width : 48,
        animation : true,//开启过渡动画
        animation_duration:2400,//800ms完成动画 
        legend:{
            enable:true,
        background_color : null,
        border : {
            enable : false
        }
        },
        coordinate:{
            background_color : '#f1f1f1',
            scale:[{
                position:'left',
                /*start_scale:0,
                  end_scale:140,
                  scale_space:20
                  */
            }],
            width:1000,
            height:800
        }
    });
    chart.draw(); 


    var set0 = cmpdebuglist[0].weightset;
    var set1 = cmpdebuglist[1].weightset;
    var pie_data = [];

    for (var i=0;i < set0.length;i++){
        if (i == 0) {
            fieldName = "bweight";
        } else {
            fieldName = "field" + i;
        }
        pie_data.push({
            name : fieldName,
            value : set0[i] - set1[i],
            color : "#b56f8f",
        });
    }

    new iChart.Column2D({
        render : 'diffbarchart',
        data: pie_data,
        title : '第1个结果与第2个结果的权值差异',
        decimalsnum:2,
        width : 1024,
        animation : true,//开启过渡动画
        animation_duration:2400,//800ms完成动画 
        height : 800,
        coordinate:{
            background_color:'#fefefe',
            scale:[{
                position:'left',
            }]
        }
    }).draw(); 
}

function drawCmpTable (cmplist) {

    if (cmplist.length < 1) {
        return;
    }

    var cmpdebuglist = [];
    for (var i=0;i<cmplist.length;++i){
        doc = cmplist[i];
        var cmpdebug = $('#'+doc.resultkey).data("cmpdebug");
        if (cmpdebug) {
            cmpdebuglist.push(cmpdebug);
        }
    }

    var row = $("<tr></tr>");
    row.append("<td>weight</td>");
    row.append("<td colspan='" + cmpdebuglist[0].weightval +"'>cse_value中各调权字段原始值</td>");
    $('#cmpbartable table thead').empty();
    $('#cmpbartable table thead').append(row);

    $('#cmpbartable table tbody').empty();
    for (var i=0;i<cmplist.length;++i){
        var cmpdebug = cmpdebuglist[i];


        var row = $("<tr></tr>");
        for (var j=0;j<cmpdebug.weightval.length;j++){
            row.append("<td>"+cmpdebug.weightval[j]+"</td>");
        }
        $('#cmpbartable table tbody').append(row);
    } 
}


function drawDiffTable (cmplist) {

    var cmpdebuglist = [];
    for (var i=0;i<cmplist.length;++i){
        doc = cmplist[i];
        var cmpdebug = $('#'+doc.resultkey).data("cmpdebug");
        if (cmpdebug) {
            cmpdebuglist.push(cmpdebug);
        }
    }

    var row = $("<tr></tr>");
    row.append("<td>weight</td>");
    row.append("<td colspan='" + cmpdebuglist[0].weightset+"'>cse_value中各调权字段生效调权值</td>");
    $('#diffbartable table thead').empty();
    $('#diffbartable table thead').append(row);

    $('#diffbartable table tbody').empty();
    for (var i=0;i<cmpdebuglist.length;++i){
        var cmpdebug = cmpdebuglist[i];

        var row = $("<tr></tr>");
        for (var j=0;j<cmpdebug.weightset.length;j++){
            row.append("<td>"+cmpdebug.weightset[j]+"</td>");
        }
        $('#diffbartable table tbody').append(row);
    } 
}

