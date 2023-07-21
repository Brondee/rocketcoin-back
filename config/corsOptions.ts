const whiteList = [
  'http://localhost:3000',
  'http://62.217.181.93:3000',
  'https://rocket-coin.online',
  '34.174.53.2',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by cors'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
