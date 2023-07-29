const whiteList = [
  'http://localhost:3000',
  'http://62.217.181.93:3000',
  'https://rocket-coin.online',
  '34.174.53.2',
  '50.63.178.200',
  '188.40.3.73',
  '2a01:4f8:d0a:30ff::2',
  '157.90.97.92',
  '34.250.159.173',
  '34.244.210.150',
  '52.212.236.135',
  '34.251.83.149',
  '173.249.3.197',
  '35.165.166.40',
  '35.166.159.131',
  '52.40.3.140',
  '104.37.173.238',
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
