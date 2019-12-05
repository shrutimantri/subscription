const http = require('http')
const port = 8000


var app = require("express")();
var cors = require('cors');
app.use(cors({credentials: true, origin: true}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var request = require("request");
const  getAllItemsViewHandler = require("./getAllItemsViewManger");
const subscriptionManager = require('./subscriptionManager.js');


const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const getAllItemsViewRequestHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(getAllItemsViewHandler.InventoryListing));
  response.status(200).send(JSON.stringify(getAllItemsViewHandler.InventoryListing));
  console.log("Response object " + response);
}

const receiveMessageHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(request.body));
  var testResponse = {
    "test" : "testSuccess"
  }
  response.status(200).send(JSON.stringify(testResponse));
  console.log("Response object " + response);
}

const callbackMessageHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(request.body));
  var testResponse = {
    "test" : "testSuccess"
  }
  response.status(200).send(JSON.stringify(testResponse));
  console.log("Response object " + response);
}

const createSubscriptionHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(request.body));

  subscriptionManager.createSubscription(request.body)
  var testResponse = {
    "createsubscription" : "testSuccess"
  }
  response.status(200).send(JSON.stringify(testResponse));
}


app.listen(process.env.PORT || port, () => console.info('Application running on port 8000'));

app.get('/getAllItems', getAllItemsViewRequestHandler);

app.post('/receiveMessage', receiveMessageHandler);

app.post('/callbackMessage', callbackMessageHandler);

app.post('/createSubscription', createSubscriptionHandler)
