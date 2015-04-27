var GCE = require('../lib/GCE');
var fs = require('fs');

var projectId = 'focal-inquiry-92622';
var gce = new GCE(projectId);

gce.start(function() {
  var data = fs.readFileSync('sivart-master.json');
  gce.createInstance(JSON.parse(data), function(err, res) {
    if (err) {
      console.log('Error creating master: ' + err);
    } else {
      console.log('sivart-master VM created wait for: ');
      console.log('http://146.148.94.5/alive');
      var seen_output = '';
      function getout() {
        gce.getSerialConsoleOutput({ instance: 'sivart-master' }, function(err, total_output) {
          if (!err) {
            var contents = total_output.contents;
            contents.replace(seen_output, '');
            seen_output += contents;
            console.log(contents);
            setTimeout(getout, 5000);
          } else {
            console.log('error getting serial console output: ' + err);
          }
        });
      }
      getout();
    }
  });
});
