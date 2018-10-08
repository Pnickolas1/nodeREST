// dependencies 

var server = require('./lib/server')

var workers = require('./lib/workers')


// decalre the app
var app = {}

// init function

app.init = function() {
  //start the server
  server.init()
  //start the workers
  workers.init()
}

// execute that function
app.init()

//
module.exports = app;