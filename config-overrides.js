/* config-overrides.js */

require('dotenv').config()
const path = require('path')
const { override, addBabelPlugins, addWebpackResolve, overrideDevServer } = require('customize-cra')
const fs = require('fs')

const devServerConfig = () => config => {
  return {
    ...config,
    port: 3000,
    proxy: {
      '/dev': {
        target: 'https://wallet.confluxscan.io/faucet',
        changeOrigin: true,
        ws: false,
        secure: false,
      },
    },
  }
}

module.exports = {
  webpack: override(
    ...addBabelPlugins('react-hot-loader/babel'),
    addWebpackResolve({
      alias: { '@': path.resolve(__dirname, 'src') },
    }),
    config => {
      console.log(config)
      console.log('--------------------')
      console.log(config.plugins)
      fs.writeFileSync('./debug-webpack', JSON.stringify(config))
      return config
    }
  ),
  devServer: overrideDevServer(devServerConfig()),
}
