# Conflux Wallet

### Technical review article: [How to build an Ethereum Wallet web app (Medium)](https://medium.freecodecamp.org/how-to-build-an-ethereum-wallet-web-app-ac77dcaac573)

### [Sub Plan 1 Document](./Wallet_Sub_Plan1_Document.md)

### Core components

- [ ] [LightWallet V3](https://github.com/ConsenSys/eth-lightwallet)
- [ ] [Web3.js](https://github.com/ethereum/web3.js/) Ethereum JavaScript API
- [ ] [React-boilerplate](https://github.com/react-boilerplate/react-boilerplate) as a wrapper of React JS, Redux, Saga, Reselect, ImmutableJS and more
- [ ] [Ant Design](https://github.com/ant-design/ant-design) React js components
- [ ] [Webpack 3](https://github.com/webpack/webpack) - A bundler for javascript and friends.
- [ ] Many others, See [package.json](https://github.com/PaulLaux/eth-hot-wallet/blob/master/package.json)

### API Providers

- [ ] [Infura.io](https://infura.io/) as JsonRPC provider for ETH
- [ ] [Coinmarketcap](https://coinmarketcap.com/) as exchange rates provider

### Features

- [x] Encryption keys generated from seed and stored in the browser.
- [x] Network selector including local and remote rpc
- [x] Responsive design for mobile support.

### Todo

- [ ] Smart Contract
- [ ] Tests
- [ ] CI for development and production
- [ ] External security audit

### Development

4 Major containers were created:

- Homepage container - all the actions related to keystore, including manipulation and usage.

- Header container - all the activities related to network communication / web3 API.

- SendTo container - state and actions related to sendTo modal, actual checks and sending is happening in header container.

#### npm scripts for conflux wallet:

`npm run build:dll` to build webpack DLL required for development.

`npm run start` to start development mode. Go to http://localhost:3001 - changes will be reflected in realtime using hot module reloading.

`npm run build` to create bundle for publishing

`npm run generate` to create new components / containers using the generator.

For more documentation regarding the react setup see [react-boiledplate docs](https://eth-hot-wallet.com/docs/react-boilerplate/) here or in the official repo.

After build, webpack monitor will generate stats about bundle size:
