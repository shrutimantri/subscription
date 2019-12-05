const dynamo = require('./dynamo.js');
const uuidv1 = require('uuid/v1');

var AWS = require("aws-sdk");
const keys = require("./config/key.js");
const dynamoConfig = require("./dynamoConfig.js");

var docClient = new AWS.DynamoDB.DocumentClient();
var items = [
  {
    asin : 'asin1',
    price : 200
  },
  {
    asin : 'asin2',
    price : 100
  }

];
var subscription = {
  id : uuidv1(),
  items: items,
  subscriptionDetail : {
    interval : 'DAY'
  }

};

createSubscription(subscription);

function createSubscription(subscription) {
//Place the first order.
//Save in dynamo.

  persistSubscription(subscription, function(data) {});

}




function persistSubscription(subscription, callback) {
  console.log("Persisting subscription" + subscription);

  var params = {
    TableName: "Subscription",
    Item: subscription
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add item." +
          util.inspect(params.Item, { showHidden: false, depth: null }) +
          " Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      callback(subscription);
    }
  });
}
