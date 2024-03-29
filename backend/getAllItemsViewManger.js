var csv = require("csv");
var InventoryMap = {};
var InventoryListing = [];
loadInventory();
function Inventory(asin, itemName, qty, price, quantity, category) {
  this.asin = asin.trim();
  this.itemName = itemName.toLowerCase().trim();
  this.qty = qty.trim();
  this.price = price.trim();
  this.quantity = quantity.trim();
  this.category = category.trim();
}

function loadInventory() {
  var obj = csv();

  obj.from.path("backend/inventory.csv").to.array(function(data) {
    for (var index = 0; index < data.length; index++) {
      var inventory = new Inventory(
        data[index][0],
        data[index][1],
        data[index][2],
        data[index][3],
        data[index][4],
        data[index][5]
      );


      InventoryListing.push(inventory);
    //  console.log("Response returned for all the items is " + JSON.stringify(InventoryListing));
      InventoryMap[inventory.asin] = inventory;
    }
    console.log(
      "Loaded inventory completely of size " + InventoryListing.length
    );
  });
}

var getAllItems = function() {
  console.log("Response returned for all the items is " + JSON.stringify(InventoryListing));
  return InventoryListing;
};

exports.InventoryListing = InventoryListing;
