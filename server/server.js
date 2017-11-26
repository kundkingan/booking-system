const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const webSocket = require('./socket/socket');
const api = require('./routes/api');
const app = express();
const port = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/api', api);
app.set('port', port);

const server = http.createServer(app);
const socket = webSocket(server);

server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = server;