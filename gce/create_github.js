var Ins = require('sivart-GCE/Instance');
var Auth = require('sivart-GCE/Auth');
var fs = require('fs');
var path = require('path');

var github = new Ins(Auth.projectId, 'us-central1-a', 'github');

console.log('deleting existing github host');
github.delete(function(err, resp) {
  var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'github.json')));
  var startup = fs.readFileSync(path.join(__dirname, 'github_startup.sh'), 'utf8');
  data.disks[0].initializeParams.sourceImage = 'global/images/github';
  data.metadata.items[0].value = startup;
  console.log('creating github host');
  github.create({ instance: data }, function(err, resp) {
    if (err) {
      console.error('Error creating github');
      console.error(err);
    } else {
      github.tail_gce_console(function(err, data) {
        console.log(data);
        if (data.toString().match('__ALIVE__')) {
          return true;
        }
      });
    }
  });
});
