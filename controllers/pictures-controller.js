'use strict';

var multer = require('multer');
var process = require('process');

var Picture = require('../entities/Picture');
var config = require('../services/config');

var upload = multer({ dest: 'uploads/' });

function addPictureRequestValidation(req, res, next) {
    var validate = function() {
        if (!req.file) return "Expected a file";
        if (req.file.mimetype.indexOf('image/') !== 0) return "The file isn't a image (check mimetype)";
        if (!req.body.location) return "Expected a location";
        return null;
    }
    var error = validate();
    error === null ? next() : res.status(400).send({error: error});
}

function addPicture(req, res) {
    var latlong = req.body.location.split(',');
    var lat = parseInt(latlong[0]);
    var long = parseInt(latlong[1]);

    var picture = new Picture({
        fileName: req.file.filename,
        location: [ lat, long ]
    });

    picture.save((err) => {
        if (err) {
            res.status(500).send({status: false, error: err});
        }
        res.send({status: true, error: null});
    });
}

function transformPicturesData(picture) {
    return {
        id: picture._id,
        url: 'http://' + config.host + ':' + config.port + '/api/pictures/' + picture.fileName + '.jpg',
        latitude: picture.location[0],
        longitude: picture.location[1]
    };
}

function getPictures(req, res) {
    Picture.find({}, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.send(data.map(transformPicturesData));
    });
}

function getPictureResource(req, res) {
    res.sendFile(process.cwd() + '/uploads/' + req.params.pictureId, {
        headers: {'Content-Type': 'image/jpeg'}
    });
}

module.exports = {
    addPicture: [upload.single('picture'), addPictureRequestValidation, addPicture],
    getPictures: [getPictures],
    getPictureResource: [getPictureResource]
};