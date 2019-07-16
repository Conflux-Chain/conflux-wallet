const errorCode = {
  c10002: 10002,
  c10019: 10019,
  c10020: 10020,
  c330024: 330024,
}
const errorMsg = '报告！服务器出了点小问题，稍后再试试...'

function handleCommonError(err, config) {
  const { code } = err
  switch (code) {
    case errorCode.c10002:
    case errorCode.c10019:
    case errorCode.c10020: {
      break
    }
    default: {
      if (!config.noErrorTip) {
        handleNoCommontError(err)
      }
    }
  }
}
function handleNoCommontError(err) {
  if (!err) {
  } else if (err.errorItems && err.errorItems.length > 0 && err.errorItems[0].message) {
  } else if (err.message) {
  } else {
  }
}
export { handleCommonError, handleNoCommontError, errorMsg, errorCode }
