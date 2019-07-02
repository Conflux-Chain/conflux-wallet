interface IConfig {
  authKey: string
  baseUrl: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
