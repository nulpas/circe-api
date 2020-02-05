import portScan from 'portscanner';
import configFile from '../src/config/config.json';
import * as dotEnv from 'dotenv';
dotEnv.config();

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const portStatusPromise = portScan.checkPortStatus(process.env.CHECK_PORT_PORT, config.host);
portStatusPromise.then(status => {
  if (status === 'open') {
    console.log(config.host, process.env.CHECK_PORT_PORT, status); /* eslint-disable-line no-console */
  }
});
