var twilio = require('twilio');

const dynamo = require('./dynamo.js');

const keys = require("./config/key.js");
const dynamoConfig = require("./dynamoConfig.js");

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

const accountSid = 'AC41614b53f2ff8cf448ba16de3e7aebba';



var getOAuthKey = function(accountSid, callback) {
  var params = {
    TableName: "TwillioAccount",
    Key: {
      'sid': accountSid
    }
  };
  docClient.get(params, function(err, data) {
    if (err) console.log(err);
    else callback(data.Item);
  });
};
var client
getOAuthKey(accountSid, function(data) {
  client = require('twilio')(accountSid, data.token);

})

setTimeout(function(){sendMessage("aaa")}, 3000)

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
