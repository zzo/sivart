function Callbacks(gce) {
  this.gce = gce;
}

Callbacks.prototype.push = function(data, cb) {
  this.gce.getZones(cb);
};

module.exports = Callbacks;
