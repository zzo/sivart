var Server = require('./lib/Server');
var GCE = require('./lib/GCE');
var Callbacks = require('./lib/Callbacks');
var port = process.argv[2] || 8080;
var projectId = 'focal-inquiry-92622';

var gce = new GCE(projectId);
var callbacks = new Callbacks(gce, { });
var server = new Server(callbacks);

gce.start(function() {
  server.start(port, function(s) {
    host = s.address().address;
    port = s.address().port;
    console.log('server on %s:%s', host, port);
  });
});
