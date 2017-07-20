/**
 * Created by konoe_mario on 2017/07/18.
 */

var http = require("http");
var server = http.createServer();

//urlディスパッチャに使う
var url = require("url");

//htmlファイルの読み込み
var fs = require("fs");




server.on("request",function(req, res){
    console.log("リクエストがあったよ");

    var incomingUrl = url.parse(req.url);

    console.log(incomingUrl.pathname);

    if(incomingUrl.pathname === "/controller"){

        fs.readFile("./client/controller.html","utf-8",(err,data)=> {

            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('<head><meta charset="UTF-8"></head>');
                res.end("<h1>Not Found</h1>");
            }else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });


    }else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write('<head><meta charset="UTF-8"></head>');
        res.end("<h1>Not Found</h1>");
    }

});

//socket.ioで使う
var io = require("socket.io")(server);

//socket確認用のコード
io.sockets.on("connection",function (socket) {
    console.log("socket connection");

    socket.on("sendMessage",function (data) {
        socket.emit('test',data);
    });

});

server.listen(6677);