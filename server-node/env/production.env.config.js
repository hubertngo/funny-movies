const corsDomains = [
  'http://localhost:3000',
  'http://13.212.82.60:3000',
];
// eslint-disable-next-line import/no-commonjs
module.exports = {
  apps: [
    {
      name: 'funny-movie-production',
      script: './src/server.js',
      interpreter: 'babel-node',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        MONGO_URL: 'mongodb://127.0.0.1:27017/FunnyMovie',
        CORS_DOMAIN: corsDomains.join(','),
      },
    },
  ],
};
