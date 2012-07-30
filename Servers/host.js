var http = require("http"),
    url = require("url"),
    fs = require("fs");
    
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname,
        path = pathname.substr(1),
        file,
        error = false;
        
    if (/\/$/.test(path)) {
        try {
            file = fs.readFileSync(path + 'index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(file, 'utf8');
        } catch (err) {
            error = true;
        }            
    }
    
    if (/\.(?:js)$/.test(path)) {
        try {
            file = fs.readFileSync(path, 'utf8');
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(file);
        } catch (err) {
            error = true;
        }
    }
    
    if (/\.(?:json)$/.test(path)) {
        try {
            file = fs.readFileSync(path, 'utf8');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(file);
        } catch (err) {
            error = true;
        }
    }
    
    if (/\.(?:png)$/.test(path)) {
        try {
            file = fs.readFileSync(path, 'binary');
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(file);
        } catch (err) {
            error = true;
        }
    }
    
    if (/\.(?:mp3)$/.test(path)) {
        try {
            file = fs.readFileSync(path, 'binary');
            res.writeHead(200, {'Content-Type': 'audio/mpeg3'});
            res.end(file);
        } catch (err) {
            error = true;
        }
    }
    if (/\.(?:wav)$/.test(path)) {
        try {
            file = fs.readFileSync(path, 'binary');
            res.writeHead(200, {'Content-Type': 'audio/wav'});
            res.end(file);
        } catch (err) {
            error = true;
        }
    }
    
    if (error) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync('Server/404.html', 'utf8'));
    }
}).listen(process.env.PORT, process.env.IP);
console.log('server running on ' + process.env.IP + ':' + process.env.PORT);