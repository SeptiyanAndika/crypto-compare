//const Promise = require ('bluebird');
const loki = require('lokijs');
const db = new loki('db.json');
const TelegramBot = require('node-telegram-bot-api');
const price = require('./price');
const token = '';
const bot = new TelegramBot(token, {polling: true});

db.loadDatabase({}, function() {
	subscribers  = db.getCollection('subscriber');
	if(subscribers==null){
		subscribers  = db.addCollection('subscriber');
	}
	
	require("./bot")(db,subscribers,bot,price);
	require("./scheduler")(subscribers,bot,price);
	
});







