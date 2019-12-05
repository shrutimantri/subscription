var twilio = require('twilio');



const accountSid = 'AC3998f65824129f7532f07178cfdbd812';
const authToken = 'c88a4c32e9cf387ad7da537232d26c79';
const client = require('twilio')(accountSid, authToken);


function sendMessage(msg) {
  client.messages
        .create({
           body: msg,
           from: 'whatsapp:+14155238886',
           to: 'whatsapp:+919908287499'
         })
        .then(message => console.log(message.sid))
        .done();
}

module.exports.sendMessage = sendMessage;
