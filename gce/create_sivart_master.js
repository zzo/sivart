var Ins = require('sivart-GCE/Instance');
var Auth = require('sivart-GCE/Auth');

var sivart_master = new Ins(Auth.projectId, 'us-central1-a', 'sivart-master');

sivart_master.delete(function(err, resp) {
  sivart_master.create({ file: 'sivart-master.json' }, function(err, resp) {
    if (err) {
      console.error('Error creating master');
      console.error(err);
    } else {
      sivart_master.tail_gce_console(function(err, data) {
        console.log(data);
        if (data.toString().match('__ALIVE__')) {
          return true;
        }
      });
    }
  });
});
