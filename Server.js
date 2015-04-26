var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

function Express(callbacks) {
  var me = this;
  this.app = express();
  this.app.use(bodyParser.json())
  this.callbacks = callbacks;
  this.app.post('/push', jsonParser, function (req, res) {
    me.callbacks.push(req.body, function(err, data) {
      res.send(data);
    });
  });
  this.app.get('/push', jsonParser, function (req, res) {
    me.callbacks.push(req.body, function(err, data) {
      res.send(data);
    });
  });
}

Express.prototype.start = function(port, cb) {
  var me = this;
  this.server = this.app.listen(port, function() {
    cb(me.server);
  });
};

module.exports = Express;
