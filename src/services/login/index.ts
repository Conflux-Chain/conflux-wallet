import confluxWeb from '@/vendor/conflux-web'
import { Account, EncryptedKeystoreV3Json } from 'web3-eth-accounts/types'
/**
 * 创建账户
 * @param {*} password
 * @returns 创造后的账户对象
 */
export function create(password): Promise<Account> {
  return new Promise((resolve, reject) => {
    try {
      const account: Account = confluxWeb.cfx.accounts.create(password)
      return resolve(account)
    } catch (e) {
      return reject(e)
    }
  })
}
/**
 * 加密生成keystore json 内容
 * @param account 账户
 * @param password 密码
 */
export function genKeyStore(account: Account, password: string): Promise<EncryptedKeystoreV3Json> {
  return new Promise((resolve, reject) => {
    try {
      const v3Json: EncryptedKeystoreV3Json = account.encrypt(password)
      return resolve(v3Json)
    } catch (e) {
      return reject(e)
    }
  })
}

export function createFile(fileName, content) {
  //  TODO:创建文件
}
export function readFile(file): Promise<string> {
  return new Promise((reslove, reject) => {
    try {
      const reader = new FileReader()
      reader.onload = (evt: any) => {
        const fileContent = evt.target.result
        reslove(fileContent)
      }
      reader.readAsText(file)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 *
 * @param {*} keystoreJson  要解密私钥的keystore文件的json对象
 * @param {*} password 加密keystore文件的密码，一般为创建账号时的密码
 * @return {Object} 解密后的账户对象
 */

export function login(keystoreJson, password): Promise<Account> {
  return new Promise((resolve, reject) => {
    try {
      const account: Account = confluxWeb.cfx.conaccounts.decrypt(keystoreJson, password)
      return resolve(account)
    } catch (e) {
      return reject(e)
    }
  })
}
