var ghBuild = require('sivart-slave/GetBuildFromGitHubEvent');

function Callbacks(gce, args) {}

Callbacks.prototype.github = function(eventName, data, cb) {
  console.log(data);
  var build = ghBuild(eventName, data);
  build.doBuilds(function() {});
  cb();
};

module.exports = Callbacks;
