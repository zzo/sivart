var Server = require('./lib/Server');
var Callbacks = require('./lib/Callbacks');
var util = require('./lib/util');
var GCE = require('sivart-GCE');

var port = process.argv[2] || 8080;
var projectId = 'focal-inquiry-92622';
var zone = 'us-central1-a';

var gce = new GCE(projectId, zone);
var callbacks = new Callbacks(gce, { });
var server = new Server(callbacks, util);

gce.start(function() {
  server.start(port, function(s) {
    host = s.address().address;
    port = s.address().port;
    console.log('server on %s:%s', host, port);
    console.log('__ALIVE__');
  });
});
