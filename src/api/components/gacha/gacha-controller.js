const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function drawGacha(request, response, next) {
  try {
    const userId =
      request.body.userId || request.query.userId || request.headers['user-id'];
    const userName =
      request.body.userName ||
      request.query.userName ||
      request.headers['user-name'];

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID tidak valid.');
    }

    const result = await gachaService.drawGacha(userId, userName);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistoryUser(request, response, next) {
  try {
    const userId =
      request.body.userId || request.query.userId || request.headers['user-id'];

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID tidak valid.');
    }

    const history = await gachaService.getHistoryUser(userId);

    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getAvailPrizes(request, response, next) {
  try {
    const prizes = await gachaService.getAvailPrizes();

    return response.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinners();

    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  drawGacha,
  getHistoryUser,
  getAvailPrizes,
  getWinners,
};
