var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true},
	hash: String,
	salt: String
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	return this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 5);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, process.env.SECRET);
};

mongoose.model('User', UserSchema);