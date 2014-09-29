var Video = require('./video');

var Diderot = function(){};
Diderot.prototype.inscribe = function(video_url) {
  var video = new Video(video_url);
};
