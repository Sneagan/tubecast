var FeedParser = require('feedparser');
var request = require("request");
var Show = function(feed_url) {
  this.url = feed_url;
  this.fetch(this.url);
  this.test = 0;
};

Show.create = function(feed_url) {
  return new Show(feed_url);
};

Show.prototype.fetch = function(feed_url) {
  if (this.url && feed_url && this.url !== feed_url) this.url = feed_url;
  if (!this.url && feed_url) this.url = feed_url;
  var feed = this.url;
  var self = this;
  if (!feed) {
    console.log('ERROR: Please provide a URL to the fetch method');
    return false;
  }
  function done(err) {
    if (err) {
      console.log(err, err.stack);
      return process.exit(1);
    }
  }
  function getParams(str) {
    var params = str.split(';').reduce(function (params, param) {
      var parts = param.split('=').map(function (part) { return part.trim(); });
      if (parts.length === 2) {
        params[parts[0]] = parts[1];
      }
      return params;
    }, {});
    return params;
  }
  // Define our streams
  var new_request = request(feed, {timeout: 10000, pool: false});
  new_request.setMaxListeners(50);
  // Some feeds do not respond without user-agent and accept headers.
  new_request.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
     //.setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser();

  // Define our handlers
  new_request.on('error', done);
  new_request.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    var charset = getParams(res.headers['content-type'] || '').charset;
    // And boom goes the dynamite
    res.pipe(feedparser);
  });

  feedparser.on('error', done);
  feedparser.on('end', done);
  feedparser.on('readable', function() {
    while (test = this.read()) {
      self.grabRelevantData(test, self);
    }
  });
};

Show.prototype.grabRelevantData = function(data, self) {
  self.title = self.title === data.meta.title ? self.title : data.meta.title;
};

module.exports = Show;
