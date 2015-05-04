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
      data.action != 'synchronize' &&
      data.action != 'reopened') {
        return;
    }

    // only build if pr was actually merged on 'closed'
    if (data.action == 'closed' && !data.merged) {
      return;
    }
  }
  try {
    console.log('Create new Project for github event: ' + eventName);
    var project = new Project(eventName, data);
    project.createAllSlaves(function(errors, responses) {
      if (errors.length) {
        console.log('Creation errors:');
        console.log(errors);
      }
      console.log('Creation responses:');
      console.log(responses);
    });
  } catch(e) {
    console.log(e);
  }
};

module.exports = Callbacks;
