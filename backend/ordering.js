const dynamo = require('./dynamo.js');
var AWS = require("aws-sdk");
const keys = require("./config/key.js");
const util = require("util");
const apb = require('./apb.js');
const dynamoConfig = require("./dynamoConfig.js");
const uuidv1 = require('uuid/v1');
const telegram = require('./telegram.js');
const whatsapp = require('./whatsapp.js');
const store = require('data-store')({ path: process.cwd() + '/foo.json' });

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



//subscriptionManager.createSubscription(subscriptionData);

callEvery2Seconds(0);

function callEvery2Seconds(i) {
    setTimeout(() => {
        console.log('Infinite Loop Test n:', i);
        subscriptionManager.fetchAllSubscriptions(function(subscriptionList) {
              //for all subscriptions which are in next 1 min, check if next order is scheduled then place order.
              //
              if(subscriptionList != null) {
                subscriptionList.forEach(function(subscription) {
                  var timeNow = (new Date()).getTime();
                  console.log('NEXT ORDER PLACE TIME ' + subscription.nextOrderCutoffDate +  "TIME NOW " + timeNow + " FOR " + subscription);
                  if(subscription.nextOrderCutoffDate < timeNow) {
                    notifyCustomerForOrderUpdate(subscription)
                  } else if(subscription.nextOrderPlaceDate < timeNow) {
                    placeOrder(subscription);
                  }
              });

              }
        });

        callEvery2Seconds(++i);
    }, 2000)
}

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

  var messageString = "Your subscription for " + getItemDisplay(subscription) + " is ready to be shipped in the next 1 hours." +
  "\nReply 1 to continue with the order.\nReply 2 to cancel the order."
  store.set('communicationSubscription', subscription);
  updateSubscriptionWithNotification(subscription, function(data) {})
  whatsapp.sendMessage(messageString);

}

function notifyOnWhatsappResponse(whatsAppResponse) {
  setTimeout(function() {
    if(whatsAppResponse == "2") {
      var messageString = "We have cancelled your order succesfuly."
      whatsapp.sendMessage(messageString);
      var lastSubscription = store.get("communicationSubscription")
      updateSubscriptionWithOrderDetails(lastSubscription, "orderId" , 1),
      function(data) {

      });

    } else {
      var messageString = "We will process your order shortly."
      whatsapp.sendMessage(messageString);
    }
  }
   , 5000 );
}

function placeOrder(subscription) {
  console.log("Placing order for " + subscription);
  //generateOrderId
  var orderId = generateOrderId();
  updateSubscriptionWithOrderDetails(subscription, orderId , subscription.orderIntervalInDays),
  function(data1) {

    apb.deductMoney(subscription.userId, subscription.total, function(data2) {

    }
  );

    //telegram.sendMessage("Your order with orderID "  + orderId + "is on the way" + " Your order is expected to be delivered in next 1 hour");
  }
  );

  //deduct money.
  //notify customer of order placement.

}

function nextOrderDate(currentOrderPlaceDate, intervalDays) {
  return currentOrderPlaceDate + intervalDays * 24 * 60 * 60 * 1000;
}

function generateOrderId() {
  return "D01-" + uuidv1();
}

function updateSubscriptionWithNotification(subscription, callback) {
  subscription.nextOrderCutoffDate = ((new Date).getTime())+ 60 * 60 * 1000;;
  subscriptionManager.persistSubscription(subscription, function(data) {
    callback(data);
  })
}

function updateSubscriptionWithOrderDetails(subscription, orderId, callback) {
  subscription.numOfOrder = subscription.numOfOrder + 1;
  //subscription.nextOrderCutoffDate = nextOrderDate;
  subscription.nextOrderPlaceDate = ((new Date).getTime())+ 60 * 60 * 1000;;
  subscription.lastOrderDate = ((new Date).getTime());
  subscription.lastOrderId = orderId;
  console.log("SAving " + JSON.stringify(subscription));
  subscriptionManager.persistSubscription(subscription, function(data) {
    callback(data);
  })

}



function cancelNextOrder() {

}

module.exports.notifyOnWhatsappResponse = notifyOnWhatsappResponse;
