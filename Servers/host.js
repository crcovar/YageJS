var http = require("http"),
    url = require("url"),
    fs = require("fs");

/* Functions for serving the different content */
function send404(res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('Servers/404.html', 'utf8'));
}
    
function serveHtml(path, res) {
    var file;
    try {
        file = fs.readFileSync(path);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(file, 'utf8');
    } catch (err) {
        send404(res);
    } 
}
    
function serveJavascript(path, res) {
    var file;
    try {
        file = fs.readFileSync(path, 'utf8');
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(file);
    } catch (err) {
       send404(res);
    }
}

function serveJson(path, res) {
    var file;
    try {
        file = fs.readFileSync(path, 'utf8');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(file);
    } catch (err) {
        send404(res);
    }
}

function servePng(path, res) {
    var file;
    try {
        file = fs.readFileSync(path);
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(file);
    } catch (err) {
        send404(res);
    }
}

function serveAudio(path, res) {
    send404(res);
}

/* Setup environment settings if needed */
if (!process.env.IP) {
    process.env.IP = '127.0.0.1';
}
if (!process.env.PORT) {
    process.env.PORT = '80';
}

/* Create the hosting server */
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname,
        path = pathname.substr(1);
        
    if (path === '') {
        send404(res);
    }
        
    if (/\/$/.test(path)) {
        serveHtml(path + 'index.html', res);
    }
    
    if (/\.(?:js)$/.test(path)) {
        serveJavascript(path, res);
    }
    
    if (/\.(?:json)$/.test(path)) {
        serveJson(path, res);
    }
    
    if (/\.(?:png)$/.test(path)) {
        servePng(path, res);
    }
    
    if (/\.(?:mp3)$/.test(path) || /\.(?:wav)$/.test(path)) {
        serveAudio(path, res);
    }

}).listen(process.env.PORT, process.env.IP);
console.log('server running on ' + process.env.IP + ':' + process.env.PORT);