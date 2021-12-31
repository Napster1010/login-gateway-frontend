const express = require('express');
const proxy = require('express-http-proxy');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/api', proxy('http://localhost:8080'));

app.use(express.static('login-gateway', {
  etag: false
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-gateway/index.html'));
});

const port = '443';

const serverOptions = {
  key: fs.readFileSync('cert/privkey.pem'),
  cert: fs.readFileSync('cert/fullchain.pem')
};

const server = https.createServer(serverOptions, app);

server.listen(port, () => console.log(`Server running on localhost:${port}`));