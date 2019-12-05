const http = require('http')
const port = 8000


var app = require("express")();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var request = require("request");
const  getAllItemsViewHandler = require("./getAllItemsViewManger");


const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

<<<<<<< HEAD
const getAllItemsViewRequestHandler = (request, response) => {
  console.log(request.url)
  console.log(JSON.stringify(getAllItemsViewHandler.InventoryListing));
  response.status(200).send(JSON.stringify(getAllItemsViewHandler.InventoryListing));
  console.log("Response object " + response);
}

=======
app.get('/items', (req, res) => {
    console.log("called");
    res.send("items");
});

const server = http.createServer(requestHandler)
>>>>>>> b425ac6dfb9becc4efbaf6bfc0664b2af5d14e11

app.listen(port, () => console.info('Application running on port 8000'));

app.get('/getAllItems', getAllItemsViewRequestHandler);
