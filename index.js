var Server = require('./Server');
var gce = require('./GCE');
var Callbacks = require('./Callbacks');
var port = 3000;

var callbacks = new Callbacks(gce);
var server = new Server(callbacks);

gce.start(function() {
  server.start(port, function(s) {
    host = s.address().address;
    port = s.address().port;
    console.log('server on %s:%s', host, port);
  });
});
