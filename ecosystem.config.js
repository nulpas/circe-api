module.exports = {
  apps : [{
    name: 'vyz',
    script: './vyz.js',
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
