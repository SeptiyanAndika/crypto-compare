//const Promise = require ('bluebird');
const TelegramBot = require('node-telegram-bot-api');
const price = require('./price');

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/hi/, (msg, match) => {
  
  const chatId = msg.chat.id; 
  const start = new Date();
  price.getCompareMessage(resp=>{
	const end = new Date() - start;
	let message = resp;
	message+="\nExecution time: "+end+"ms";
	console.log(`Send message to ${chatId} with body ${message}`);
	bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
  });
 
});

