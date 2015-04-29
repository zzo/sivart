var gcloud = require('gcloud');
var path = require('path');
var Project = require('sivart-slave/Project');

function Callbacks(gce, args) {
}

Callbacks.prototype.github = function(eventName, data, cb) {
  console.log(data);
  cb();
  var project = new Project(eventName, data);
  project.createAllSlaves(function(errors, responses) {
    if (errors.length) {
      console.log('Creation errors:');
      console.log(errors);
    }
    console.log('Creation responses:');
    console.log(responses);
  });
};

module.exports = Callbacks;
