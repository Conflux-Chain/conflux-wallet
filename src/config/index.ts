interface IConfig {
  authKey: string
  baseUrl: string
  FCContractAdress: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
  FCContractAdress: '0xf2f4e0da85035cbe70b14a3df4fd7a1e0a82f9ab',
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
