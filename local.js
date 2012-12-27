//#!phantomjs
"use strict";

var fs = require("fs");

var page = require("webpage").create();
page.onConsoleMessage = function (msg, line, id) {
    console.log("console: " + msg);
};

page.open("foo.html", function (status) {
    console.log("open foo.html: " + status);
    phantom.exit();
});

// vim: set expandtab:
