gce = require('../lib/GCE');
fs = require('fs');

gce.start(function() {
  var data = fs.readFileSync('sivart-master.json');
  gce.createInstance(JSON.parse(data), function(err, res) {
    if (err) {
      console.log('Error creating master: ' + err);
    } else {
      console.log('sivart-master VM created wait for: ');
      console.log('http://146.148.94.5/alive');
    }
  });
});
