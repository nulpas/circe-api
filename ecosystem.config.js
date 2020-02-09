module.exports = {
  apps : [{
    name: 'sds-circe-api',
    script: './sds-circe-api.js',
    env: {
      NODE_ENV: 'development'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
