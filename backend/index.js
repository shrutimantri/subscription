const http = require('http')
const port = 8000

var express = require('express')


const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

app.get('/items', (req, res) => {
    console.log("called");
    res.send("items");
});

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
