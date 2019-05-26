const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const router = require('./src/router');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static(path.join(__dirname, '/Users/scholar/work/logistics/myexpress')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router(app);

app.listen(9494);

