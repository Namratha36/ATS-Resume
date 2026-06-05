const expess = require('express');


const app = express();

app.use(express.json());

module.exports = app;