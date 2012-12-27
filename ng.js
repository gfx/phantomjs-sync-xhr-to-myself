//#!phantomjs
"use strict";

var fs = require("fs");

var server = require("webserver").create();

server.listen(1234, function (req, res) {
    var t0 = Date.now();

    console.log("# accept: " + req.url);
    var path = req.url.slice(1); // skip first "/"

    var headers = {
      "Access-Control-Allow-Origin" : "*"
    };

    var content = "";
    if (fs.exists(path)) {
      content = fs.read(path);
      headers["Content-Type"] =
          path.match(/\.html$/) ? "text/html"
        : path.match(/\.css$/)  ? "text/css"
        : path.match(/\.js$/)   ? "application/javascript"
        : path.match(/\.json$/) ? "application/json"
        :                         "text/plain";
      headers["Content-Type"] += "; charset=UTF-8";
      res.writeHead(200, headers);
      res.write(content);
    }
    else {
      headers["Content-Type"] = "text/plain";
      res.writeHead(404, headers);
      res.write("file not found\n");
    }
    res.close();
    var elapsed = (Date.now() - t0) / 1000;
    console.log("#   elapsed: " + elapsed +" sec."
        + " path: " + path
        + " size: " + content.length);
});

console.log("# listening 1234");

var page = require("webpage").create();
page.onConsoleMessage = function (msg, line, id) {
    console.log("console: " + msg);
};

page.open("http://0:1234/foo.html", function (status) {
    console.log("open foo.html: " + status);
});

// vim: set expandtab:
