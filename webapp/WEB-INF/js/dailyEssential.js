getText = function(url, callback) // How can I use this callback?
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            callback(request.responseText); // Another callback here
        }
    }; 
    request.open('GET', url);
    request.send();
}

function mycallback(data) {
   console.log("daily Essentail call");
   renderPage(data);
}

getText('http://localhost:8000/getAllItems', mycallback);


function renderPage(data) {
    items=JSON.parse(data);
    var groceryRow = window.document.getElementById("dailyEssentailRow");
    console.log(items);
    console.log(groceryRow);
    for(var i = 0; i < items.length; ++i) {
        if(items[i]["category"] == "DAILY_ESSENTIALS") {
           groceryRow.innerHTML += '<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="images/product-3.jpg" alt="Colorlib Template"><div class="overlay"></div></a><div class="text py-3 pb-4 px-3 text-center"><h3><a href="#">'+items[i].itemName+'</a></h3><div class="d-flex"><div class="pricing"><p class="price"><span>₹ '+items[i].price+'</span></p></div></div><div class="bottom-area d-flex px-3"><div class="m-auto d-flex"><a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center"><span><i class="ion-ios-menu"></i></span></a><a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1"><span><i class="ion-ios-cart"></i></span></a><a href="#" class="heart d-flex justify-content-center align-items-center "><span><i class="ion-ios-heart"></i></span></a></div></div></div></div></div>'
        }
    }
}
