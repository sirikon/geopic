var mongoose = require('mongoose');

var PictureSchema = {
    fileName: String,
    location: {
        type: [Number]
    }
};

module.exports = mongoose.model('Picture', PictureSchema);