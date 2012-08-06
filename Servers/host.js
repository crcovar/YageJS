var connect = require('connect'),
    full = __dirname + '/../YageJS',
    min = __dirname + '/../YageJS-build/';

/* Setup environment settings if needed */
if (!process.env.PORT) {
    process.env.PORT = '80';
}

connect().use(connect.logger())
    .use(connect.compress())
    .use(connect.static(full))
    .listen(process.env.PORT);
console.log('server running on port ' + process.env.PORT);