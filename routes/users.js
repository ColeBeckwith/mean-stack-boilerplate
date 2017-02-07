var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function (req, res, next) {
	User.find({}, function (err, users) {
		res.send(users);
	});
});

router.get('/usersList', function (req, res, next) {

});

router.delete('/user/:username', function (req, res, next) {

});

router.delete('/clearUsers', function(req, res, next) {
	User.find({}).remove().exec().then(function(resp) {
		res.json(resp);
	});
});

module.exports = router;
