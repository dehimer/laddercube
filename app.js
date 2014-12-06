var http = require('http');
var url = require("url");
var static = require('node-static');
var file = new static.Server('./public');


var http = require('http');


var server = http.createServer(function(request, response) {

    request.addListener('end', function() {
        console.log(request.url)
        if (request.url == '/') {
            file.serveFile('/index.html', 200, {}, request, response);
        }
        //просто отдаем файл
        else {
            file.serve(request, response, function(e, res) {
                if (e && (e.status === 404)) {
                    file.serveFile('/not-found.html', 404, {}, request, response);
                }
            });
        }
    }).resume();


}).on('error', function(error) {
    console.log(error);
}).listen(3000);