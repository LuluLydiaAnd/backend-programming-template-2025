const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/draw', gachaController.drawGacha);

  route.get('/history', gachaController.getHistoryUser);

  route.get('/prizes', gachaController.getAvailPrizes);

  route.get('/winners', gachaController.getWinners);
};
