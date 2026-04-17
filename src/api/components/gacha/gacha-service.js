const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

const prizes = [
  { id: 1, name: 'Emas 10 gram', quota: 1 },
  { id: 2, name: 'Smartphone X', quota: 5 },
  { id: 3, name: 'Smartwatch Y', quota: 10 },
  { id: 4, name: 'Voucher Rp100.000', quota: 100 },
  { id: 5, name: 'Pulsa Rp50.000', quota: 500 },
];

const chance = {
  1: 0.5,
  2: 2,
  3: 5,
  4: 15,
  5: 30,
};

function maskName(name) {
  if (!name || name.length < 2) {
    return name || 'Anonim';
  }

  const patterns = [
    () => {
      const parts = name.split(' ');
      if (parts.length > 1) {
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        return `${firstName[0] + '*'.repeat(firstName.length - 1)} ${lastName}`;
      }
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    },
    () => {
      let masked = '';
      for (let i = 0; i < name.length; i += 1) {
        if (name[i] === ' ') {
          masked += ' ';
        } else {
          const showChar = Math.random() > 0.6;
          masked += showChar ? name[i] : '*';
        }
      }
      return masked;
    },
    () => {
      if (name.length <= 2) {
        return `${name[0]}*`;
      }
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    },
  ];

  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
}

async function drawGacha(userId, userName) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const drawsToday = await gachaRepository.getTodayDraw(userId, today);

  if (drawsToday >= 5) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'Maximum 5 draws per day reached'
    );
  }

  const availPrizeId = [];
  const prizeChecks = prizes.map((prize) =>
    gachaRepository.getWinnerCount(prize.id).then((winners) => {
      if (winners < prize.quota) {
        availPrizeId.push(prize.id);
      }
    })
  );
  await Promise.all(prizeChecks);

  let wonPrize = null;
  if (availPrizeId.length > 0) {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (let i = 0; i < availPrizeId.length; i += 1) {
      const prizeId = availPrizeId[i];
      cumulative += chance[prizeId];
      if (random < cumulative) {
        wonPrize = prizes.find((p) => p.id === prizeId);
        break;
      }
    }
  }

  const record = await gachaRepository.createDraw(
    userId,
    userName || userId,
    wonPrize ? wonPrize.id : null,
    wonPrize ? wonPrize.name : null
  );

  return {
    message: wonPrize
      ? `CONGRATS CUZZZ!!! U WON ${wonPrize.name}!`
      : 'ZONK.....better luck next time...',
    prize: wonPrize,
    drawId: record.id,
    drawsRemaining: 5 - (drawsToday + 1),
  };
}

async function getHistoryUser(userId) {
  return gachaRepository.getHistoryUser(userId);
}

async function getAvailPrizes() {
  const result = [];

  const prizeChecks = prizes.map((prize) =>
    gachaRepository.getWinnerCount(prize.id).then((winners) => {
      result.push({
        id: prize.id,
        name: prize.name,
        quota: prize.quota,
        remaining: prize.quota - winners,
      });
    })
  );
  await Promise.all(prizeChecks);

  return result;
}

async function getWinners() {
  const winners = await gachaRepository.getAllWinners();

  const grouped = {};

  winners.forEach((winner) => {
    if (!grouped[winner.prizeId]) {
      grouped[winner.prizeId] = {
        prizeId: winner.prizeId,
        prizeName: winner.prizeName,
        winners: [],
      };
    }

    const originalName = winner.userName || winner.userId;
    const maskedName = maskName(originalName);

    grouped[winner.prizeId].winners.push({
      userId: winner.userId,
      name: maskedName,
      winDate: winner.drawDate,
    });
  });

  return Object.values(grouped);
}

module.exports = {
  drawGacha,
  getHistoryUser,
  getAvailPrizes,
  getWinners,
};
