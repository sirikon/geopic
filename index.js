var express = require('express')
var app = express();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

require('./services/database');
var Picture = require('./entities/Picture');

var picturePostRequestValidation = (req, res, next) => {
    var result = true;

    if (!req.file) {
        result = false;
    }

    if (req.file.mimetype.indexOf('image/') !== 0) {
        result = false;
    }

    if (!req.body.location) {
        result = false;
    }

    if (!result) {
        res.send('Nope');
    } else {
        next();
    }
}

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
