var connect = require('connect');

/* Setup environment settings if needed */
if (!process.env.PORT) {
    process.env.PORT = '80';
}

connect().use(connect.logger())
    .use(connect.compress())
    .use(connect.static(__dirname + '/..'))
    .listen(process.env.PORT);
console.log('server running on port ' + process.env.PORT);