var connect = require('connect'),
    full = __dirname + '/../YageJS',
    min = __dirname + '/../YageJS-build/',
    port = process.env.PORT || 80;

connect().use(connect.logger('dev'))
    .use(connect.compress())
    .use(connect.static(full))
    .listen(port);
console.log('server running on port ' + port);