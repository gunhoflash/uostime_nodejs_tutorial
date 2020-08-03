const Message = require('../models/Message');

exports.createMessage = (data) => {
	Message.create({
		content: data
	}, function (err, res) {

		// create 과정에서 오류가 있었으면, 그거 출력하고 끝내!
		if (err) {
			console.log(err);
			return;
		}

		// 잘 저장된 것 같다.
		console.log(res);
	});
}

exports.findMessage = (res) => {
	Message.findOne({}, function (err, message) {

		// findOne 과정에서 오류가 있었으면, 그거 출력하고 끝내!
		if (err) {
			console.log(err);
			res.send("아무것도 못 찾음, 오류가 났음!");
			return;
		}

		// 잘 찾았으니까 그대로 출력해보자
		console.log(message);

		// 그대로 주지 말고, content만 뽑아서 보내주자!
		res.send(message.content);
	});
}