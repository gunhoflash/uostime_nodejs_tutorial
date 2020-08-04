const Message = require('../models/Message');

exports.createMessage = (content, author) => {
	Message.create({
		content: content,
		author: author
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

		// 그대로 주지 말고, content랑 author만 뽑아서 보내주자!
		res.json({
			content: message.content,
			author: message.author
		});
	});
}

// 모든 메시지를 지워보자
exports.deleteMessage = (res) => {
	Message.deleteMany({}, function (err) {

		// deleteMany 과정에서 오류가 있었으면, 그거 출력하고 끝내!
		if (err) {
			console.log(err);
			res.send('삭제 중 에러 발생');
			return;
		}

		// 모든 메시지가 삭제되었다!
		res.send('모두 삭제 완료!');
	});
}

// author를 기준으로 메시지를 수정보자
exports.updateMessage = (content, author) => {
	Message.updateOne(

		{ author: author },   // author 가 ${author}인 message를 찾아서
		{ content: content }, // content를 ${content}로 바꿔라!

		function (err, res) { // 그런 다음, 이 함수를 실행한다.

			// update 과정에서 오류가 있었으면, 그거 출력하고 끝내!
			if (err) {
				console.log(err);
				return;
			}

			// 잘 수정된 것 같다.
			console.log(res);
		}

	);
}