const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const Telegraf = require('telegraf');
const bot = new Telegraf('576805895:AAE5Pg2SMGXWgvup1kcRL0NK0GymOLb--zM');

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

bot.start((ctx) => {
	console.log('Id пользователя:', ctx.from.id);
	return ctx.reply('Добро пожаловать!');
});

bot.command('findmatch', (ctx) => ctx.reply('Three matches found'));
