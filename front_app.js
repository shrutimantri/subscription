const express = require('express');
const app = express();
    app.set("view options", {layout: false});
    app.use(express.static(__dirname + '/webapp/WEB-INF'));
    app.use(express.json());
var cartItems = [];
var fs = require('fs');
var sys = require('sys');
//var cartItems = "{\"DAILY_ESSENTIALS\":[{\"name\":\"Toned Milk\",\"quantity\":2,\"pricePerUnit\":21},{\"name\":\"Eggs\",\"quantity\":6,\"pricePerUnit\":6}],\"GROCERY\":[{\"name\":\"Toned Milk\",\"quantity\":2,\"pricePerUnit\":21},{\"name\":\"Toned Milk\",\"quantity\":2,\"pricePerUnit\":21}],\"RESTAURANTS\":[],\"MEDICINES\":[]}";

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/cart')
    .get(function(req, res) {
        res.json(cartItems);
    });

app.post("/api/cartItem", (req, res) => {
	const cartItem = {
		name: req.body.name,
		quantity: req.body.quantity,
		price: req.body.price
	}
	cartItems.push(cartItem);
	console.log(cartItems);
	res.send(cartItem);
});

app.get("/", function(request, response){
      //response.send("<h1 style='text-align:center'>Hey Friends, welcome to subscription<h1>");
      response.render('/webapp/WEB-INF/index.html');
})

//app.use("/cart.html", cartItems);
app.get("/cart.html", function(request, response){
    response.render('/webapp/WEB-INF/cart.html', cartItems);
})

app.listen(8080, function(error){
    if(error == true) {
        console.log("Some error occurred");
    } else {
        console.log("listening on localhost:8080");
    }
})

app.use('/api', router);