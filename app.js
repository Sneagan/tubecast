var Hapi = require('hapi');
var DBDaemon = require('./modules/dbdaemon');
var Diderot = require('./modules/diderot');
var port = process.env.PORT || 3000;
var server = new Hapi.Server(port);

var diderot = new Diderot();
var daemon = DBDaemon.start('tubecastuser:abc123@localhost:27017', ['shows']);

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './build/shows/',
      listing: true,
      index: true
    }
  }
});
server.route({
  method: 'POST',
  path: '/add/{param*}',
  handler: function(req, reply) {diderot.addShow(req, reply);}
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
