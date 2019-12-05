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
  console.log(JSON.stringify(request));
  var testResponse = {
    "test" : "testSuccess"
  }
  response.status(200).send(JSON.stringify(testResponse));
  console.log("Response object " + response);
}

const callbackMessageHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(request));
  var testResponse = {
    "test" : "testSuccess"
  }
  response.status(200).send(JSON.stringify(testResponse));
  console.log("Response object " + response);
}


app.listen(process.env.PORT || port, () => console.info('Application running on port 8000'));

app.get('/getAllItems', getAllItemsViewRequestHandler);

app.get('/receiveMessage', receiveMessageHandler);

app.get('/callbackMessage', callbackMessageHandler);
