var Hapi = require('hapi');
var port = process.env.PORT || 3000;
var server = new Hapi.Server(port);

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public/',
      listing: true,
      index: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/podcast/rss/bookbytes.rss',
  handler: function (request, reply) {
    Sentinel.watch(request, reply);
    reply.file('./public/podcast/rss/bookbytes.rss');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

Mercury.castNet();
