var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

function Express(callbacks) {
  var me = this;
  this.app = express();
  this.app.use(bodyParser.json())
  this.callbacks = callbacks;
  this.app.post('/', jsonParser, function (req, res) {
    var eventName = req.headers['x-github-event'];
    me.callbacks.github(eventName, req.body, function(err, data) {
      res.end('');
    });
  });
  this.app.post('/github', jsonParser, function (req, res) {
    var eventName = req.headers['x-github-event'];
    me.callbacks.github(eventName, req.body, function(err, data) {
      res.end('');
    });
  });
  this.app.post('/push', jsonParser, function (req, res) {
    var eventName = req.headers['x-github-event'];
    me.callbacks.github(eventName, req.body, function(err, data) {
      res.end('');
    });
  });
  this.app.get('/alive', function(req, res) {
      res.end('yes');
  });
}

Express.prototype.start = function(port, cb) {
  var me = this;
  this.server = this.app.listen(port, function() {
    cb(me.server);
  });
};

module.exports = Express;
