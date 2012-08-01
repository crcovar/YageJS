var http = require("http"),
    url = require("url"),
    fs = require("fs");

/**
 * Reads a url path and serves up the appropriate file.
 * @param path Relative location to the project root of the object to be served.
 * @param res The HTTP(S) Response object
 */
function send(path, res) {
    var stat,
        type;
    
    if (path.substr(-1) === '/') { type = 'text/html'; path += 'index.html'; }
    if (path.substr(-3) === '.js') { type = 'application/javascript'; }
    if (path.substr(-5) === '.json') { type = 'application/json'; }
    if (path.substr(-4) === '.png') { type = 'image/png'; }
    if (path.substr(-4) === '.mp3') { type = 'audio/mpeg'; }

    try {
        stat = fs.statSync(path);
        res.writeHead(200, {
            'Content-Type': type,
            'Content-Length': stat.size
        });
        fs.createReadStream(path).pipe(res);
    } catch (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream('Servers/404.html').pipe(res);
    }
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

    send(path, res);
}).listen(process.env.PORT, process.env.IP);
console.log('server running on ' + process.env.IP + ':' + process.env.PORT);