module.exports.handleResponse = function (result, response) {
  if (result.code >= 0) {
    response.json(result)
  }
  response.status(500).json(result)
}

module.exports.handleDBErr = function (err) {
  return err && err.code
    ? err
    : {
      code: -1,
      data: {
        msg: err.toString()
      }
    }
}

module.exports.verifyEmail = function (str) {
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(str)
}
