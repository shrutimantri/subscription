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
   console.log("mycallback called");
   balance = JSON.parse(data)
   document.getElementById("aPayBalance").innerHTML = '₹ ' + balance["balance"];
}

getText('https://serene-mesa-07102.herokuapp.com/balance', mycallback);
