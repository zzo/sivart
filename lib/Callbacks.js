'use strict';

var ghBuild = require('sivart-slave/GetBuildFromGitHubEvent');

function Callbacks() {}

Callbacks.prototype.github = function(eventName, data, cb) {
  console.log(data);
  // only build PR 'synchronized', 'opened', and 'closed' with 'merged=true'

  function doBuilds() {
    var build = ghBuild(eventName, data);
    console.log('Kicking off a build for %s on branch %s', build.repoName, build.branch);
    if (eventName === 'pull_request') {
      console.log('    for PR %s for %s', build.pr, build.action);
    } else {
      console.log('    at commit %s', build.commit);
    }
    build.doBuilds(function(err) {
      if (err) {
        console.log('Error kicking off builds:');
        console.log(err);
      }
    });
  }

  if (eventName === 'push') {
    doBuilds();
  } else if (eventName === 'pull_request') {
    if (data.action === 'opened' || data.action === 'synchronize') {
      doBuilds();
    } else if (data.action === 'closed' && data.merged) {
      doBuilds();
    }
  }

  cb();
};

module.exports = Callbacks;
