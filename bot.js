const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

if (process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, {polling: true});
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
	console.dir(msg);
	const name = msg.from.first_name;
	const kolianID = 466035983;
	const isMsgFromKolian = msg.from.id === kolianID;
	const isCoubVideo = msg.text && msg.text.indexOf('coub') !== -1;

	try {
		if (
			isMsgFromKolian
			&& msg.text
		) {
			const resMsg = name + ', і шо дальше?';
			bot
				.sendMessage(msg.chat.id, resMsg)
				.then(() => {
					/* reply sent! */
				});
		}
		if (
			isMsgFromKolian
			&& !!msg.left_chat_member
			&& msg.left_chat_member.id === kolianID
		) {
			const resMsg = name + ', ШО ОПЯТЬ?';
			bot.sendMessage(msg.chat.id, resMsg);
			bot
				.getChatMember(msg.chat.id, msg.from.id)
				.then((chatMember) => {
					// bot.sendMessage(chatMember.user.id, 'Повернись, благаю );');
				});
		}
		if (
			isMsgFromKolian
			&& isCoubVideo
		) {
			const resMsg = name + ', знову х*йня якась :(';
			bot.sendMessage(msg.chat.id, resMsg);
		}
	} catch (e) {
		// console.error(e);
	}
});

module.exports = bot;
