const dynamo = require('./dynamo.js');
var AWS = require("aws-sdk");
const keys = require("./config/key.js");
const util = require("util");
const apb = require('./apb.js');
const dynamoConfig = require("./dynamoConfig.js");
const uuidv1 = require('uuid/v1');
const telegram = require('./telegram.js');
const whatsapp = require('./whatsapp.js');


const subscriptionManager = require('./subscriptionManager.js');

var docClient = new AWS.DynamoDB.DocumentClient();

var items = [
  {
    asin : 'asin1',
    price : 200,
  },
  {
    asin : 'asin2',
    price : 100
  }

];

var subscriptionData = {
  id : uuidv1(),
  "userId" : "user",
  "creationDate" : 1575536122,
  "orderIntervalInDays" : 1,
  "excludeDays" : [
    "SUNDAY",
    "SATURDAY"
  ],
  "deliverySlotStartTime" : 1575536122,
  "category" : "DAILY_ESSENTIALS",
  "items" : [
    {
      "asin" : "EGG",
      "itemName" : "Egg",
      "quantity" : 2,
      "price" : 20.4
    },
    {
      "asin" : "milk",
      "itemName" : "Milk",
      "quantity" : 1,
      "price" : 12.4
    }
  ]

}



subscriptionManager.createSubscription(subscriptionData);
setTimeout(function() {
  subscriptionManager.fetchAllSubscriptions(function(subscriptionList) {
        //for all subscriptions which are in next 1 min, check if next order is scheduled then place order.
        //

        subscriptionList.forEach(function(subscription){
          var timeNow = (new Date()).getTime();
          console.log('NEXT ORDER PLACE TIME ' + subscription.nextOrderPlaceDate +  "TIME NOW " + timeNow + " FOR " + subscription);
          if(subscription.nextOrderPlaceDate < timeNow) {
            placeOrder(subscription);
          }
      });
  });


} , 2000);

function getItemDisplay(subscription) {
  var itemstr = "";
  for(var i=0;i<subscription.items.length;i++) {
    itemstr = itemstr + subscription.items[i].itemName;
    if(i!=subscription.items.length -1)
     itemstr = itemstr + ","
  }
  return itemstr;
}


function notifyCustomerForOrderUpdate(subscription) {

  var messageString = "Your subscription for " + getItemDisplay(subscription) + " will be delivered in the next 1 hours." +
  "\n:thumbs Reply 1 to cancel the order.\nReply 2 to continue the order."
  whatsapp.sendMessage(messageString);

}


function placeOrder(subscription) {
  console.log("Placing order for " + subscription);
  //generateOrderId
  var orderId = generateOrderId();
  updateSubscriptionWithOrderDetails(subscription, orderId, (new Date()).getTime(), nextOrderDate((new Date()).getTime()),
  function(data1) {

    apb.deductMoney(subscription.userId, subscription.total, function(data2) {

    }
  );

    //telegram.sendMessage("Your order with orderID "  + orderId + "is on the way" + " Your order is expected to be delivered in next 1 hour");
  }
  );

  notifyCustomerForOrderUpdate(subscription)
  //deduct money.
  //notify customer of order placement.

}

function nextOrderDate(currentOrderPlaceDate) {
  return currentOrderPlaceDate + 24 * 60 * 60 * 1000;
}

function generateOrderId() {
  return "D01-" + uuidv1();
}

function updateSubscriptionWithOrderDetails(subscription, orderId, orderDate, nextOrderDate, callback) {
  subscription.numOfOrder = subscription.numOfOrder + 1;
  subscription.nextOrderPlaceDate = nextOrderDate;
  subscription.lastOrderDate = orderDate;
  subscription.lastOrderId = orderId;
  console.log("SAving " + JSON.stringify(subscription));
  subscriptionManager.persistSubscription(subscription, function(data) {
    callback(data);
  })

}


function placeOrderForSubscription(subscription) {
  //check when to place the next order.
  //IF weekly
}


function cancelNextOrder() {

}
