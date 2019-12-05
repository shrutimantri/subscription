const express = require('express');
const http = require('http');
const app = express();
    app.set("view options", {layout: false});
    app.use(express.static(__dirname + '/webapp/WEB-INF'));
    app.use(express.json());
var cartItems = [];
var items = [];
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
    console.log("cart page");
    response.render('/webapp/WEB-INF/cart.html', cartItems);
})

var extServerOptions = {
    host: 'localhost',
    port: '8000',
    path: '/getAllItems',
    method: 'GET'
};

function get() {
    http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            items = JSON.parse(data);
            console.log("got items");
        });
 
    }).end();
};


get();

function renderGrocery() {
    console.log("renderGrocery worked");
    var groceryRow = window.document.getElementById("groceryRow");
    groceryRow.innerHTML += '<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="images/product-3.jpg" alt="Colorlib Template"><div class="overlay"></div></a><div class="text py-3 pb-4 px-3 text-center"><h3><a href="#">Green Beans</a></h3><div class="d-flex"><div class="pricing"><p class="price"><span>$120.00</span></p></div></div><div class="bottom-area d-flex px-3"><div class="m-auto d-flex"><a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center"><span><i class="ion-ios-menu"></i></span></a><a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1"><span><i class="ion-ios-cart"></i></span></a><a href="#" class="heart d-flex justify-content-center align-items-center "><span><i class="ion-ios-heart"></i></span></a></div></div></div></div></div>'
}


app.listen(8080, function(error){
    if(error == true) {
        console.log("Some error occurred");
    } else {
        console.log("listening on localhost:8080");
    }
})

app.use('/api', router);
