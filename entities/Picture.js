var mongoose = require('mongoose');

var PictureSchema = {
    fileName: String,
    location: {
        type: [Number],
        index: '2dsphere'
    }
};

module.exports = mongoose.model('Picture', PictureSchema);