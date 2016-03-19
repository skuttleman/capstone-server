var mongo = require('./mongo');
var mocks = [
  require('../api/v1/mock1').data,
  require('../api/v1/mock2').data
];

mongo.openDB().then(function(db) {
  return mongo.withOpen(db, 'game_levels', 'find', {}).then(function(levels) {
    return Promise.all(
      mocks.map(updateLevel(db, levels))
    );
  }).then(function() {
    db.close();
  }).catch(console.error);
});

function updateLevel(db, levels) {
  return function(mock, i) {
    return mongo.withOpen(db, 'game_levels', 'update', { _id: levels[i]._id },
    { $set: mock });
  };
}
