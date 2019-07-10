/**
 * 读取文件内容
 * @param file 文件对象
 */
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
 * 创建文件
 * @param fileName 文件名称
 * @param content 文件内容
 */
export function createFile(fileName, content) {
  //  TODO:创建文件
}
