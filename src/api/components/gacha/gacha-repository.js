const { GachaDraws } = require('../../../models');

async function getTodayDraw(userId, date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  return GachaDraws.countDocuments({
    userId,
    drawDate: { $gte: date, $lt: nextDay },
  });
}

async function getWinnerCount(prizeId) {
  return GachaDraws.countDocuments({ prizeId });
}

async function createDraw(userId, userName, prizeId, prizeName) {
  return GachaDraws.create({
    userId,
    userName,
    drawDate: new Date(),
    prizeId,
    prizeName,
  });
}

async function getHistoryUser(userId) {
  return GachaDraws.find({ userId }).sort({ drawDate: -1 });
}

async function getAllWinners() {
  return GachaDraws.find({ prizeId: { $ne: null } })
    .sort({ prizeId: 1, drawDate: 1 })
    .lean();
}

module.exports = {
  getTodayDraw,
  getWinnerCount,
  createDraw,
  getHistoryUser,
  getAllWinners,
};
