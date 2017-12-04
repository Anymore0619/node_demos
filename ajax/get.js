/**
 * Created by liaosiqun on 2017/11/23.
 */
var http = require('http');
var url = require('url');
var util = require('util');


http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});

    var params = url.parse(req.url,true);
    var data = params.query;
    for(var key in data){
        data[key] = data[key] + 'saaa';
    }
    res.end(JSON.stringify(data));
}).listen(8000);