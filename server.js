const express = require('express');
const proxy = require('express-http-proxy');
const https = require('https');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();

app.disable('view cache');
app.use('/api', proxy('http://localhost:8080'));

app.use(express.static('login-gateway', {
  etag: false
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-gateway/index.html'));
});

const httpsPort = '443';
const httpPort = '80';

const serverOptions = {
  key: fs.readFileSync('cert/privkey.pem'),
  cert: fs.readFileSync('cert/fullchain.pem')
};

const httpsServer = https.createServer(serverOptions, app);
httpsServer.listen(httpsPort, () => console.log(`Server running on localhost:${httpsPort}`));

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
  res.end();
});
httpServer.listen(httpPort);