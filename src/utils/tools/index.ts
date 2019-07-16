/**
 * 创建并下载文件
 * @param  {String} fileName 文件名
 * @param  {String} content  文件内容
 */
export function createAndDownloadFile(fileName, content) {
  const aTag = document.createElement('a')
  const blob: any = new Blob([content])
  aTag.download = fileName
  aTag.href = URL.createObjectURL(blob)
  aTag.click()
  URL.revokeObjectURL(blob)
}

/**
 * 读取文件内容
 * @param file 文件对象
 */
export function readFileContentByFileObj(file): Promise<string> {
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
