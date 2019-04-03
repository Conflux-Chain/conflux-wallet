export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const tokenName = 'CFX';

/* Auto generated password lenght */
export const generatedPasswordLength = 12;

/* Default HD path string for key generation from seed */
export const hdPathString = `m/44'/60'/0'/0`; // eslint-disable-line

// time in ms for check balancess polling
export const timeBetweenCheckbalances = 180 * 1000;

/* Max gas for send transaction (not gas price) */
export const maxGasForCfxSend = 25000;
/* Max gas for token send transaction (not gas price) */
export const maxGasForTokenSend = 60000;
/* Max gas for DeployContract (not gas price) */
export const maxGasLimitForDeployContract = 60000;

/* Eth unit constants will be saved as strings to prevent accidental manipulation
    usage: convert amount to wei
    const sendAmount = new BigNumber(amount).times(Ether);
*/
export const Ether = (1.0e18).toString();
export const Gwei = (1.0e9).toString();

/* offline mode is special case of error */
export const offlineModeString = 'Offline';
/* Default network to connect after wallet creation (see network.js) */
export const defaultNetwork = 'Testnet';

/* keystore will be saved to local storage under this key */
export const localStorageKey = 'ks';

// addresses:
export const website = 'http://wallet.confluxscan.io/';
export const github = 'http://www.conflux-chain.org';

// APIs:
// export const checkFaucetAddress = 'http://localhost:3000/status';
// export const askFaucetAddress = 'http://localhost:3000/ask';
export const checkFaucetAddress = 'http://testnet-jsonrpc.conflux-chain.org:18082/dev/status';
export const askFaucetAddress = 'http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask';
