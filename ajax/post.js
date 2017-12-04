/**
 * Created by liaosiqun on 2017/11/23.
 */
var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function (req,res) {
    var post = '';//请求体信息
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
    req.on('data',function (block) {
        post += block;
    })

    req.on('end',function () {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    })
}).listen(8000);