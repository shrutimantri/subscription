const uuidv1 = require('uuid/v1');

const dynamo = require('./dynamo.js');
var AWS = require("aws-sdk");
const keys = require("./config/key.js");
const dynamoConfig = require("./dynamoConfig.js");
const util = require("util");

var subscriptionTable = 'Subscription';
var docClient = new AWS.DynamoDB.DocumentClient();
/*
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

getSubscriptionById("cfee63b0-172f-11ea-a7de-51aa20a1329e", function(data) {
  console.log(data);
});
*/

function createSubscription(subscription) {
//Place the first order.
//Save in dynamo.
  subscription.nextOrderPlaceDate = (new Date()).getTime();
  subscription.numOfOrder = 0;
  persistSubscription(subscription, function(data) {});
  //notifyUser(subscription);

}


function getNextOrderDate(subscription) {
  /*
  if(subscription.frequency == "DAILY") {
        //subscription.excludeDays;
  } else if (subscription.frequency == "WEEKLY") {
        //subscription.intervalDays
  } else if() {

  }
  */

}


function getSubscriptionById(subscriptionId, callback) {
  /*
  const params = {
      TableName: subscriptionTable,
      KeyConditionExpression: 'id = :i',
      ExpressionAttributeValues: {
        ':i': subscriptionId
      }
    };*/

    var params = {
      TableName : subscriptionTable,
      Key: {
        'id': subscriptionId
      }
    };
  var documentClient = new AWS.DynamoDB.DocumentClient();

  docClient.get(params, function(err, data) {
    if (err) console.log(err);
    else callback(data);
  });
}
function persistSubscription(subscription, callback) {
  console.log("Persisting subscription" + subscription);

  var params = {
    TableName: subscriptionTable,
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



function fetchAllSubscriptions(callback) {

  var params = {
    TableName: 'Subscription'
  };


  docClient.scan(params, function(err, data) {
    console.log("Query result fetchAllSubscriptions" );
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log(
        "Query succeeded." +
          util.inspect(data, { showHidden: false, depth: null })
      );
      if (data.Items.length == 0) {
        callback(null);
      }
      callback(data.Items)
      /*
      data.Items.forEach(function(item) {
        console.log(
          " getLatestCustomerCart :  " +
            util.inspect(item, { showHidden: false, depth: null })
        );
        callback(item);
      });*/
    }
  });
}

module.exports.getSubscriptionById = getSubscriptionById;
module.exports.createSubscription = createSubscription;
module.exports.fetchAllSubscriptions = fetchAllSubscriptions;
module.exports.persistSubscription = persistSubscription;
