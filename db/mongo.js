var mongo = require('mongodb');
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/tilde';

module.exports = {
  openDB: function() {
    return new Promise(function(resolve, reject) {
      mongo.MongoClient.connect(url, function(err, db) {
        if (err) return reject(err);
        else resolve(db);
      });
    });
  },
  runQuery: function(collection, action) {
    var args = Array.prototype.slice.call(arguments, 2);
    return new Promise(function(resolve, reject) {
      module.exports.openDB().then(function(db) {
        var context = db.collection(collection);
        var callback = makeCallback(resolve, reject, db, action);
        if (action == 'find') {
          context[action].apply(context, args).toArray(callback);
        } else {
          context[action].apply(context, args.concat(callback));
        }
      });
    });
  },
  withOpen: function(db, collection, action) {
    var args = Array.prototype.slice.call(arguments, 3);
    return new Promise(function(resolve, reject) {
      var context = db.collection(collection);
      var callback = makeCallback(resolve, reject, db, action, true);
      if (action == 'find') {
        context[action].apply(context, args).toArray(callback);
      } else {
        context[action].apply(context, args.concat(callback));
      }
    });
  },
  ObjectId: mongo.ObjectId
}

function makeCallback(resolve, reject, db, action, keepOpen) {
  return function(err, data) {
    if (!keepOpen) db.close();
    if (err) return reject(err);
    switch(action) {
      case 'findOne':
        return resolve([data]);
      case 'insert':
        return resolve(data.ops);
      default:
        return resolve(data);
    }
  };
}
