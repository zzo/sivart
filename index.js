var Server = require('./lib/Server');
var gce = require('./lib/GCE');
var Callbacks = require('./lib/Callbacks');
var port = 8080;

var callbacks = new Callbacks(gce);
var server = new Server(callbacks);

gce.start(function() {
  server.start(port, function(s) {
    host = s.address().address;
    port = s.address().port;
    console.log('server on %s:%s', host, port);
  });
});
