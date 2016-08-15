var express = require('express')
var app = express();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var swagger = require('swagger-express');

require('./services/database');
var Picture = require('./entities/Picture');

var validatePostRequest = function(req) {
    if (!req.file) {
        return false;
    }

    if (req.file.mimetype.indexOf('image/') !== 0) {
        return false;
    }

    if (!req.body.location) {
        return false;
    }

    return true;
}

var picturePostRequestValidation = (req, res, next) => {
    if (!validatePostRequest(req)) {
        res.send('Nope');
    } else {
        next();
    }
}

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './swagger/ui/',
    basePath: 'http://127.0.0.1:3000',
    info: {
        title: 'GeoPic',
        description: 'Swagger ready'
    },
    apis: ['./swagger/api.yml'],
    middleware: function(req, res){}
}));

app.post('/api/pictures', upload.single('picture'), picturePostRequestValidation, function(req, res){

    var latlong = req.body.location.split(',');
    var lat = parseInt(latlong[0]);
    var long = parseInt(latlong[1]);

    var picture = new Picture({
        fileName: req.file.filename,
        location: [ lat, long ]
    });

    picture.save((err) => {
        if (err) {
            console.log(err);
        }
        res.send('ok');
    });

    
});

app.get('/api/pictures', function(req, res) {

    Picture.find({}, (err, data) => {
        res.send(data);
    });

});

app.get('/api/pictures/:pictureId.jpg', function(req, res){
    res.sendFile(__dirname + '/uploads/' + req.params.pictureId, {
        headers: {'Content-Type': 'image/jpeg'}
    });
});

app.listen(3000);
