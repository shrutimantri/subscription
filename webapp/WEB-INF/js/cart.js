let request = new XMLHttpRequest();
request.open('GET', 'localhost:8000/getAllItems');
request.responseType = 'text';

request.onload = function() {
  console.log(request.response);
};

request.send();