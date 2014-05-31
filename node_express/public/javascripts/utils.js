
function cmpcheck(checkbox,resultkey,title){
    if (checkbox.checked){
        //alert("选中了,把这个结果加到对比栏");
        var iconurl = $('#icon'+resultkey).attr('src');
        var res = add2cmpbar(resultkey,title,iconurl);
        if (!res){
            checkbox.checked = false;
            /*
            $(checkbox).popover({
                'content' : '最多对比3个',
                'placement':'top',
            });
            */
            $(checkbox).grumble(
                        {
                        text: '最多对比3个,开搞吧', 
                        angle: 0, 
                        distance: 10, 
                        showAfter: 0,
                        type: 'alt-', 
                        hideAfter: 1000
                    });
        }
        $('#rankcmpbar').show();
    } else {
        delcmpbar(resultkey);
    }

    updatecmpbar();
}

function updatecmpbar()
{
    var cmplist = $('#rankcmpbar').data('cmplist');

    //alert(JSON.stringify(cmplist));

    $('.rankcmp .onecmpdoc').css('display','none');
    for (var i=0;i<cmplist.length;++i){
        $('#onecmpdoc'+i).find('img').attr('src',cmplist[i].icon);
        $('#onecmpdoc'+i).find('.cmpinfo').empty();
        $('#onecmpdoc'+i).find('.cmpinfo').append("<p>title : "+cmplist[i].title +"</p>");
        $('#onecmpdoc'+i).find('.cmpinfo').append("<p>resultkey : "+cmplist[i].resultkey+"</p>");
        $('#onecmpdoc'+i).css('display',"");
    }

    if (cmplist.length > 1){
        $('#begincmp').removeAttr('disabled');
    } else {
        $('#begincmp').attr('disabled',"true");
    }
}

function add2cmpbar(resultkey,title,iconurl){
    var cmplist = $('#rankcmpbar').data('cmplist');
    cmplist = cmplist || [];
    if (cmplist.length >= 3){
        return false;
    }
    cmplist.push({'resultkey':resultkey,'title':title,'icon':iconurl});
    $('#rankcmpbar').data('cmplist',cmplist);
    return true;
}

function delcmpbar(resultkey){
    var cmplist = $('#rankcmpbar').data('cmplist');
    cmplist = cmplist || [];
    for (var i=0;i<cmplist.length;++i){
        if (resultkey == cmplist[i].resultkey ){
            cmplist.splice(i,1);
            break;
        }
    }
    if (cmplist.length == 0){
        rankcmpbarclose();
    }
}

function rankcmpbarclose(){
    $('#rankcmpbar').hide();
    $('#cmpdebugdiv').hide("slow");
}

function onBeginCmp()
{
    var cmplist = $('#rankcmpbar').data('cmplist');
    

    drawCmpTable(cmplist);

    drawDiffTable(cmplist);

    drawCmpBar(cmplist);

    $('#cmpdebugdiv').show("slow");
}
$(function () {
/*
    $('#docTab a[href="#groupsort"]').on('shown', function (e) {
        alert(e.target);
    });
*/
    $('.carousel').carousel();
})


function BuildNewURL(name,value,oldurl)
{

    var url= oldurl || window.location.href ;
    var newUrl="";

    var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if(url.match(reg) != null)
    {
        newUrl= url.replace(eval(reg),tmp);
    }
    else
    {
        if(url.match("[\?]"))
        {
            newUrl= url + "&" + tmp;
        }
        else
        {
            newUrl= url + "?" + tmp;
        }
    }


    return newUrl;
}
