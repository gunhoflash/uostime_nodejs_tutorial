const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	content: String
});

module.exports = mongoose.model('Message', MessageSchema);
