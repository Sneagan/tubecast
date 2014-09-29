var Hapi = require('hapi');
var port = process.env.PORT || 3000;
var server = new Hapi.Server(port);

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

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
