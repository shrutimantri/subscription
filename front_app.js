const express = require('express');
const app = express();
    app.set("view options", {layout: false});
    app.use(express.static(__dirname + '/webapp/WEB-INF'));

var fs = require('fs');
var sys = require('sys');
var cartItems =

app.get("/", function(request, response){
      //response.send("<h1 style='text-align:center'>Hey Friends, welcome to subscription<h1>");
      response.render('/webapp/WEB-INF/index.html');
})

app.get("/cart.html", function(request, response){
    response.render('/webapp/WEB-INF/cart.html');
})

app.listen(8080, function(error){
    if(error == true) {
        console.log("Some error occurred");
    } else {
        console.log("listening on localhost:8080");
    }
})