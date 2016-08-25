'use strict';

var process = require('process');

module.exports = {
    host: process.env.GEOPIC_HOST || '127.0.0.1',
    port: process.env.GEOPIC_PORT || 3000,
    uploadFolder: process.env.GEOPIC_UPLOAD_FOLDER || process.cwd() + '/uploads/'
};