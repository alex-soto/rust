'use strict';
const express = require('express');
const app = express();

app.set('views', './');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/app'));

app.use('/api', require('./api'));
app.get('/', (req, res) => {
    console.log(`req: ${req}`);
    res.render('index.html');
});

app.listen(app.get('port'), () => {
    console.log(`rust app running on port: ${app.get('port')}`);
    console.log(`project URL: https://${process.env.C9_HOSTNAME}`);
});