'use strict';

var process = require('process');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geopic', function(err) {
    if (err) {
        console.log('Error while connecting to database');
        console.log(err);
        process.exit(1);
    } else {
        console.log('Connected to Database');
    }
});
