var YTDownloader = require('../bower_components/node-youtube-dl/lib/youtube-dl');

var VideoDownloader = function() {};
VideoDownloader.prototype = YTDownloader;
VideoDownloader.prototype.constructor = VideoDownloader;

VideoDownloader.protoype.download = function(url, path) {
  // Shall download to shows/[show]/episodes/[episode]
};

module.exports = VideoDownloader;
