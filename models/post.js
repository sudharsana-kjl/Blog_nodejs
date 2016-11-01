var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	post_title: String,
	post_content: String,
	updated_at: Date

});

module.exports = mongoose.model('Post',schema);
//mongoose.connect('mongodb://localhost/post');



