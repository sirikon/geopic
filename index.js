'use strict';

var express = require('express');
var config = require('./services/config');

console.log('Initializing geopic server in http://' + config.host + ':' + config.port + '/');

var app = express();

require('./services/database');
require('./swagger/config')(app);
require('./routes')(app);

app.listen(config.port);
