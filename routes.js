'use strict';

var picturesController = require('./controllers/pictures-controller');

module.exports = (app) => {
    app.post.apply(app, ['/api/pictures'].concat(picturesController.addPicture));
    app.get.apply(app, ['/api/pictures'].concat(picturesController.getPictures));
    app.get.apply(app, ['/api/pictures/:pictureId.jpg'].concat(picturesController.getPictureResource));
};