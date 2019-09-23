/* config-overrides.js */

require('dotenv').config()
const path = require('path')
const { override, addBabelPlugins, addWebpackResolve, overrideDevServer } = require('customize-cra')

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
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
}
