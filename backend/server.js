const http = require('http');
const app = require('./app');

app.set('port', 6000)
const server=http.createServer(app);

server.listen(6000);

