interface IConfig {
  authKey: string
  baseUrl: string
  FCContractAddress: string
  scanHost: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
  FCContractAddress: '0x88e2541ecee0086efc8b1b4fa8a43f83d66053e3',
  scanHost: 'http://confluxscan.io',
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
