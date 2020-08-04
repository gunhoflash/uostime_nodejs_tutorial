const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	content: String,
	author: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('Message', MessageSchema);
