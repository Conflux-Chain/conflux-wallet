interface IConfig {
  authKey: string
  baseUrl: string
  FCContractAddress: string
  scanHost: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
  FCContractAddress: '0x8af71f222b6e05b47d8385fe437fe2f2a9ec1f1f',
  scanHost: 'http://confluxscan.io',
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
