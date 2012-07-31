var http = require("http"),
    url = require("url"),
    fs = require("fs");

/* Functions for serving the different content */
function send404(res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('Servers/404.html', 'utf8'));
}

function send(path, type, res) {
    var stat,
        file;
        
    try {
        stat = fs.statSync(path);
        res.writeHead(200, {
            'Content-Type': type,
            'Content-Length': stat.size
        });
        switch (type) {
            case 'audio/mpeg3':
            case 'audio/wav':
            case 'image/png':
                fs.createReadStream(path).pipe(res);
                break;
            default:
                res.end(fs.readFileSync(path, 'utf8'));
                break;
        }
    } catch (err) {
        send404(res);
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
        path = pathname.substr(1),
        type;

    if (path.substr(-1) === '/') { type = 'text/html'; path += 'index.html'; }
    if (path.substr(-3) === '.js') { type = 'application/javascript'; }
    if (path.substr(-5) === '.json') { type = 'application/json'; }
    if (path.substr(-4) === '.png') { type = 'image/png'; }
    if (path.substr(-4) === '.mp3') { type = 'audio/mpeg3'; }

    send(path, type, res);
}).listen(process.env.PORT, process.env.IP);
console.log('server running on ' + process.env.IP + ':' + process.env.PORT);