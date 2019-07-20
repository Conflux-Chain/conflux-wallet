interface IConfig {
  authKey: string
  baseUrl: string
  FCContractAdress: string
  scanHost: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
  FCContractAdress: '0x93bc704ae360d271c77e3a4e10e8d9cdb52c8c07',
  scanHost: 'http://confluxscan.io',
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
