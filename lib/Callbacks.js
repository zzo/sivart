var gcloud = require('gcloud');

function Callbacks(gce, args) {
}

Callbacks.prototype.push = function(data, cb) {
  console.log(data);
  // send pullRepo message to master for this URL
  //var clone_url = repository.clone_url;
  var pubsub = gcloud.pubsub();
  pubsub.createTopic('', function(err, topic) {});


};

module.exports = Callbacks;
