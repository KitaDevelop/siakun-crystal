import development from "./config.development"
import mock from "./config.mock"
import production from "./config.production"

export const API_ENV = process.env.API_ENV

interface ConfigInterface {
  API_URL_CARBON: string
}

let config : ConfigInterface = development;
switch (API_ENV) {
  case 'production':
    config = production;
    break;

  case 'development':
    config = development;
    break;

  case 'mock':
    config = mock;
    break;
}

console.log(config)

export default config
