'use strict';

var swagger = require('swagger-express');
var config = require('../services/config');

module.exports = (app) => {
    app.use(swagger.init(app, {
        apiVersion: '1.0',
        swaggerVersion: '1.0',
        swaggerURL: '/swagger',
        swaggerJSON: '/api-docs.json',
        swaggerUI: './swagger/ui/',
        basePath: 'http://' + config.host + ':' + config.port,
        info: {
            title: 'GeoPic',
            description: 'Swagger ready'
        },
        apis: ['./swagger/api.yml'],
        middleware: function(req, res){}
    }));
}