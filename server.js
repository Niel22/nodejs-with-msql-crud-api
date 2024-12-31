const http = require('http');
const app = require('./app');
const port = 4000;

const server = http.createServer(app);

server.listen(port, (req, res) => {
    console.log(`Server Started at ${port}`);
});