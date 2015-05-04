var path = require('path');
var Project = require('sivart-slave/Project');

function Callbacks(gce, args) {
}

Callbacks.prototype.github = function(eventName, data, cb) {
  console.log(data);
  cb();
  if (data.action) {
    // a pull request
    if (data.action != 'opened' &&
      data.action != 'closed' &&
      data.action != 'synchronized' &&
      data.action != 'reopened') {
        return;
    }

    if (data.action == 'closed' && !data.merged) {
      return;
    }
  }
  var project = new Project(eventName, data);
  if (project) {
    project.createAllSlaves(function(errors, responses) {
      if (errors.length) {
        console.log('Creation errors:');
        console.log(errors);
      }
      console.log('Creation responses:');
      console.log(responses);
    });
  }
};

module.exports = Callbacks;
