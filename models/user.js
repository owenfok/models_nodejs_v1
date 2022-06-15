var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var UserSchema = new Schema( {
	user: String,
	password: String,
});

var User = mongoose.model('User', UserSchema);
module.exports = User;