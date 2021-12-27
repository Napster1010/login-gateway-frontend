const express = require('express');
const proxy = require('express-http-proxy');
const http = require('http');
const path = require('path');

const app = express();

app.use('/api', proxy('http://localhost:8080'));

app.use(express.static('login-gateway', {
  etag: false
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-gateway/index.html'));
});

const port = '80';

 const server = http.createServer(app);

 server.listen(port, () => console.log(`Server running on localhost:${port}`));