const dynamo = require('./dynamo.js');
const uuidv1 = require('uuid/v1');

var AWS = require("aws-sdk");
const keys = require("./config/key.js");
const dynamoConfig = require("./dynamoConfig.js");

var docClient = new AWS.DynamoDB.DocumentClient();

function Apb(userId, balance) {
  this.userId=userId;
  this.balance=balance;
}

function addMoney(user, amount, callback) {
  getUserWallet(user, function(wallet) {
    console.log(wallet);
    var updateWallet = new Apb(
      user,
      wallet == null ? amount : parseInt(wallet.balance)+ amount
    );
    saveWallet(updateWallet);
  });
}


function deductMoney(user, amount, callback) {
  getUserWallet(user, function(wallet) {
    var updateWallet = new Apb(
      user,
      parseInt(wallet.balance) - amount < 0 ? 0 :   parseInt(wallet.balance) - amount,
    );
    saveWallet(updateWallet);
  });
}


function getBalance(user, callback) {
  getUserWallet(user,function(wallet) {
    return wallet.balance;
  });
}


var getUserWallet = function(userId, callback) {
  var params = {
    TableName: "Apb",
    Key: {
      'userId': userId
    }
  };
  docClient.get(params, function(err, data) {
    if (err) console.log(err);
    else callback(data.Item);
  });
};


function saveWallet(wallet) {
  var params = {
    TableName: "Apb",
    Item: wallet
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

module.exports.addMoney = addMoney;
module.exports.deductMoney = deductMoney;
module.exports.getBalance = getBalance;
