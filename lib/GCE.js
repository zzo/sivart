var google = require('googleapis');

function GCE() {}

GCE.prototype.start = function(cb) {
  var me = this;
  this.auth(function(token) {
    var projectId = 'focal-inquiry-92622';
    me.compute = google.compute({version: 'v1', auth: token, params: {project: projectId}});
    cb();
  });
};

GCE.prototype.auth = function(cb) {
  google.auth.getApplicationDefault(function(err, authClient) {
      if (err) {
      console.error('Failed to get the default credentials: ' + String(err));
      return;
    }

    // The createScopedRequired method returns true when running on GAE or a local developer 
    // machine. In that case, the desired scopes must be passed in manually. When the code is 
    // running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server. 
    // See https://cloud.google.com/compute/docs/authentication for more information. 
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      // Scopes can be specified either as an array or as a single, space-delimited string. 
      authClient = authClient.createScoped(['https://www.googleapis.com/auth/compute']);
    }

    cb(authClient);
  });
};

GCE.prototype.getZones = function(cb) {
    this.compute.zones.list({}, function(error, result) {
      cb(null, result);
    });
};

module.exports = new GCE();
