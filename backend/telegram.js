const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const firebase = require('firebase');

const token = '996089588:AAFhR4B5U06tvuzrfA-OC3MLNhVFPT6Uqws';
const bot = new TelegramBot(token, {polling: true});

var chat = '883086141';

bot.on('message', (msg) => {
    console.log(msg.chat.id);
    bot.sendMessage(msg.chat.id, "response");
});



function sendMessage(message) {
  bot.sendMessage(chat, message);

}
module.exports.sendMessage = sendMessage;
