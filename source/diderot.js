var Video = require('./video');
var Show = require('./show');

var Diderot = function(){};
Diderot.prototype.addShow = function(url, show_name) {
  var show = new Show();
};
Diderot.prototype.addVideo = function(video_url, to_show) {
  var video = new Video();
  if (this.shows[to_show]) {
    var video_data = video.download(video_url, path);
  } else this.addShow(video_url, to_show);
};
