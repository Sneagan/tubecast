var db = require("mongojs");

var DBDaemon = function(data){
  this.url = data.url;
  this.collections = data.collections;

  db.connect(this.url, this.collections);
};

DBDaemon.start = function(db_url, collections_array) {
  var data = {
    url: db_url,
    collections: collections_array
  };
  return new DBDaemon(data);
};

module.exports = DBDaemon;
