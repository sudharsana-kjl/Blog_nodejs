var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({},function(err,posts){
		if(err) throw err;
		res.render('index', {
			title : 'Express',
			posts : posts
			});
	});
  //res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('postform', { title: 'Express' });
});

/*router.post('/create', function(req,res){
	new Post({
		post_title : req.body.post_title,
		post_content : req.body.post_content,
		updated_at : Date.now()
	}).save(function(err, post , count){
		console.log(mongoose.connection.readyState);
		res.redirect('/');
	});
});*/

router.post('/create',function(req,res){
	var npost = new Post({
		post_title : req.body.post_title,
		post_content : req.body.post_content,
		updated_at : Date.now()
	});
	npost.save(function(err,npost){
		if(err) return console.error(err);
		else console.log('saved');
		res.redirect('/');
	})
})

module.exports = router;
