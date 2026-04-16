module.exports = (db) =>
  db.model(
    'GachaDraws',
    db.Schema({
      userId: String,
      userName: String,
      drawDate: Date,
      prizeId: Number,
      prizeName: String,
    })
  );
