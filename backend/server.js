const http = require('http');
const app = require('./app');

app.set('port', 5001)
const server=http.createServer(app);

server.listen(5001);

