const http = require('http');

const { app } = require('./app');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const httpServer = http.createServer(app);
httpServer.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});

module.exports = httpServer;
