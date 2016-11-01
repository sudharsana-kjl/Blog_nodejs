var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	post_title: {type: String, required:true},
	post_detail: {type: String, required:true},
	updated_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Post',schema);
//mongoose.connect('mongodb://localhost/post');



var mongoose = require('mongoose');
