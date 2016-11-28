var mongoose = require('mongoose');              // mongoose for mongodb

// define model =================
module.exports = mongoose.model('Todo', {
    text : String,
    done : Boolean
});