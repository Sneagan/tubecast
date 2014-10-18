var Video = require('../models/video');
var Show = require('../models/show');

var Diderot = function(){};
Diderot.prototype.addShow = function(req, reply) {
  var show = Show.create(req.url.query.url);
};
Diderot.prototype.addVideo = function(video_url, to_show) {
  var video = new Video();
  if (this.shows[to_show]) {
    var video_data = video.download(video_url, path);
  } else this.addShow(video_url, to_show);
};

module.exports = Diderot;
