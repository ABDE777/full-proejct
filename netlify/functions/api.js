const serverless = require('serverless-http');
const app = require('../../registre-code/api/index.js');

module.exports.handler = serverless(app);
