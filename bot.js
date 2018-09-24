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
	const name = msg.from.first_name;
	const kolianID = 466035983;
	console.dir(msg);
	if (
		msg.from.id === kolianID && msg.text
	) {
		const resMsg = name + ', і шо дальше?';
		bot.sendMessage(msg.chat.id, resMsg).then(() => {
			// reply sent!
		});
	} else if (
		msg.from.id === kolianID
		&& !!msg.left_chat_member
		&& msg.left_chat_member.id === kolianID
	) {
		const resMsg = name + ', ШО ОПЯТЬ?';
		bot.sendMessage(msg.chat.id, resMsg);
		// bot.getChat(msg.chat.id).
	}
});

module.exports = bot;
