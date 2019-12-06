var deListB = false;
var gListB = false;
var rListB = false;
var mListB = false;
var deList;
var gList;
var rList; 
var mList; 


    
var gData = {
  "userId": "user",
  "creationDate": 1575536122,
  "orderIntervalInDays": 1,
  "excludeDays": [
    "SUNDAY",
    "SATURDAY"
  ],
  "deliverySlotStartTime": 1575536122,
  "category": "DAILY_ESSENTIALS",
  "items": [
  ]
};

function addToCart(data) {
    console.log(localStorage.getItem("asins"));
    if(localStorage.getItem("asins") == undefined)
        asins = ''
    else
        asins = localStorage.getItem("asins");
    asins += data + ",";
    localStorage.setItem("asins",asins);
    console.log(asins);
}

function renderCartPage() {
    asinList = getAsinList();
    deList = categoryList(asinList, "DAILY_ESSENTIALS");
    gList = categoryList(asinList, "GROCERY");
    rList = categoryList(asinList, "RESTAURANTS");
    mList = categoryList(asinList, "MEDICINES");
    
    console.log(deList, gList, rList, mList);
    
    var startHtml='<table class="table"><thead class="thead-primary">';
    var endHtml='</tbody></table>';
    if(deList.length != 0) {
        deListB = true;
        renderDePage();
    } else {
        document.getElementById("deCartId").remove();
    }
    if(gList.length != 0) {
        gListB = true;
        renderGPage();
    } else {
        document.getElementById("groceryCartId").remove();
    }
    if(rList.length != 0) {
        rListB = true;
        renderRPage();
    }  else {
         document.getElementById("restaurantsCartId").remove();
    }
    if(mList.length != 0) {
        mListB = true;
        renderMPage();
    }  else {
        document.getElementById("medicineCartId").remove();
    }
    
    console.log("bool", mList);
    
}

renderCartPage();

function renderMPage() {
    list1 = mList;
    ele = document.getElementById('medicineCartId');
    for(var i = 0; i < list1.length; ++i) {
        ele.innerHTML += '<table><tr class="text-center"><td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/'+
        list1[i]['asin']+'.jpeg);"></div></td><td class="product-name"><h3>'+
        list1[i]['itemName']+'</h3><p>Item Description</p></td><td class="price">₹'+
        list1[i]['price']+'</td><td class="quantity"><div class="input-group mb-3"><input type="text" name="quantity" class="quantity form-control input-number" value='+
        list1[i]['quantity']+' min="1" max="100"></div></td><td class="total"></td></tr></table>';
    }
    
}

function renderRPage() {
    list1 = rList;
    ele = document.getElementById('restaurantsCartId');
    for(var i = 0; i < list1.length; ++i) {
        ele.innerHTML += '<table><tr class="text-center"><td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/'+
        list1[i]['asin']+'.jpeg);"></div></td><td class="product-name"><h3>'+
        list1[i]['itemName']+'</h3><p>Item Description</p></td><td class="price">₹'+
        list1[i]['price']+'</td><td class="quantity"><div class="input-group mb-3"><input type="text" name="quantity" class="quantity form-control input-number" value='+
        list1[i]['quantity']+' min="1" max="100"></div></td><td class="total"></td></tr></table>';
        }

}

function renderGPage() {
    list1 = gList;
    ele = document.getElementById('groceryCartId');
    for(var i = 0; i < list1.length; ++i) {
        ele.innerHTML += '<table><tr class="text-center"><td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/'+
        list1[i]['asin']+'.jpeg);"></div></td><td class="product-name"><h3>'+
        list1[i]['itemName']+'</h3><p>Item Description</p></td><td class="price">₹'+
        list1[i]['price']+'</td><td class="quantity"><div class="input-group mb-3"><input type="text" name="quantity" class="quantity form-control input-number" value='+
        list1[i]['quantity']+' min="1" max="100"></div></td><td class="total"></td></tr></table>';
            }
}
function renderDePage() {
    list1 = deList;
    ele = document.getElementById('deCartId');
    for(var i = 0; i < list1.length; ++i) {
        ele.innerHTML += '<table><tr class="text-center"><td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/'+
        list1[i]['asin']+'.jpeg);"></div></td><td class="product-name"><h3>'+
        list1[i]['itemName']+'</h3><p>Item Description</p></td><td class="price">₹'+
        list1[i]['price']+'</td><td class="quantity"><div class="input-group mb-3"><input type="text" name="quantity" class="quantity form-control input-number" value='+
        list1[i]['quantity']+' min="1" max="100"></div></td><td class="total"></td></tr></table>';
            }
}

function getAsinList() {
    var asinList = localStorage.getItem("asins").split(',');
    asinList.pop(-1);
    asinList = asinList.filter(function(item, pos) {
        return asinList.indexOf(item) == pos;
    });
    return asinList;
}

function categoryList(asinList, category) {
    items = [];
    for(var i = 0; i < asinList.length; ++i) {
        itemDetails = asinList[i].split('-');
        if(itemDetails[0] == category) {
            itemJson = {};
            itemJson["asin"] = itemDetails[1];
            itemJson["itemName"] = itemDetails[2];
            itemJson["price"] = itemDetails[3];
            itemJson["quantity"] = 1;
            items.push(itemJson);
        }
    }
    return items;
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild; 
}

function placeOrder() {
    console.log("order placed");
    if (deListB) {
        deData = gData;
        deData['category'] = "DAILY_ESSENTIALS";
        deData['items'] = deList;
        placeOrderCall(deData);
    }
    if (rListB) {
        rData = gData;
        rData['category'] = "RESTAURANTS";
        rData['items'] = rList;
        placeOrderCall(rData);
    }
    if (mListB) {
        mData = gData;
        mData['category'] = "MEDICINES";
        mData['items'] = mList;
        placeOrderCall(mData);
    }
    if (gListB) {
        var grData = gData;
        grData['category'] = "GROCERY";
        grData['items'] = gList;
        placeOrderCall(grData);
    }
    localStorage.setItem("asins","");
}

function placeOrderCall(data) {
    data = JSON.stringify(data);
      //console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://serene-mesa-07102.herokuapp.com/createSubscription");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "03b284d9-c28d-49bf-bf43-1de648428910,7bf2202b-4545-4511-a9d8-554623cae070");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}
