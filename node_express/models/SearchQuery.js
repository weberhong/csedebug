var net = require('net');

var SearchQuery = function(squery){
    squery                        = squery || {};
    this.body                     = {};

    this.body.query         = squery.query                || "";

    this.body.pn            = parseInt(squery.pn);
    this.body.rn            = parseInt(squery.rn);

    this.body.isdebug       = squery.isdebug == "1"?true:false;

 };

SearchQuery.prototype.Query = function(host,port,callback){
    var options = {
        'host' : host,
        'port': port,
        'timeout':5000,
    }

    var buffer = new Buffer(JSON.stringify(this.body));

    send(options,buffer,function(error,resbuf){
        if (error) {
            callback(error,null);
        } else {
            var obj = JSON.parse(resbuf.toString());
            callback(null,obj);
        }
    });
}

function send(options, req, callbacks){
    var client = new net.Socket();

    var resChunks = [];
    var resSize = 0;

    client.connect(options.port, options.host, function(){
        client.write(req);
    });

    client.on('data', function(data){
        resChunks.push(data);
        resSize += data.length;
    });
    
    client.on('error', function(error){
        callbacks(error,null);
        return;
    });

    client.on('end', function(error){
        if (error){
            callbacks("sock end but something error",null);
        } else {
            var buf = Buffer.concat(resChunks, resSize);
            callbacks(null,buf);
        }
    });

    client.on('close', function(error){
        if(error){
            callbacks("the socket was closed due to a transmission error",null);
        }
    });

    client.setTimeout(options.timeout,function(){
        client.end();
        callbacks("请求服务超时了... ...",null);
    });

}

module.exports = SearchQuery;
