var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({},function(err,posts){
		if(err) throw err;
		res.render('index', {
			title : 'Bulletin Board',
			posts : posts
			});
	});
  //res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('postform', { title: 'New Post' });
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
	});
});

router.post('/update/:id',function(req,res){
	Post.findOneAndUpdate({ _id:req.params.id},
	{ $set: 
		{
			post_title : req.body.post_title,
			post_content : req.body.post_content,
			updated_at : Date.now()
		} 
	},{ upsert: true}, function(err, p) {

		if (err)
			console.log("error while updating..");    //return next(new Error('Could not load Document'));
 		else 
  			console.log("successfully updated");
  	      res.redirect('/');
         
});

});
    // do your updates here
    
    	//p._id = req.params.id;
		/*p.post_title = req.body.post_title;
		p.post_content = req.body.post_content;
		p.updated_at = Date.now();
	

    p.update(function(err) {
      if (err)
        console.log('error')
      else
        console.log('successfully updated')
    });
  }
	});
});*/

router.get('/update/:id',function(req,res){
	Post.findById(req.params.id,function(err,p){
		if(!p)
			console.log("Modified doc couldn't be saved");
		else res.render('updateform', {
			title : 'Express',
			post : p
			});
	});
});

router.get('/delete/:id',function(req,res){
	Post.findOneAndRemove({ _id:req.params.id},function(err,p){
		if(err)
			console.log("Error while deleting..");
		else console.log("deleted");
		res.redirect('/');
	});
});

module.exports = router;
