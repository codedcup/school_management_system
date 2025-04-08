require('dotenv').config();
const https = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

const server = https.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});