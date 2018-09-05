const http = require('http');
const url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

// the server should respond to all requests with a string
var server = http.createServer(function(req, res) {
  // get the url and parse it
  var parsedUrl = url.parse(req.url, true);
  // get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the query string as an object
  var queryStringObject = parsedUrl.query;

  // get the http method
  var method = req.method.toLowerCase();

  // get the headers as an object
  var headers = req.headers;

  // get the payload if any
  var decoder = new stringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });

  req.on('end', function(){
    buffer += decoder.end();

    // send the response
    res.end('hello world\n');

    // log the request path
    console.log('request recieved this payload', buffer);
  });
  // log the requests pat
});

// start the server on port 3000
server.listen(3000, function(){
  console.log('The server is listening on Port 3000');
});
