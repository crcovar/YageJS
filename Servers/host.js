var connect = require('connect');

/* Setup environment settings if needed */
if (!process.env.IP) {
    process.env.IP = '127.0.0.1';
}
if (!process.env.PORT) {
    process.env.PORT = '80';
}

connect()
    .use(connect.logger())
    .use(connect.compress())
    .use(connect.static(__dirname + '/..'))
    .listen(process.env.PORT, process.env.IP);
console.log('server running on ' + process.env.IP + ':' + process.env.PORT);