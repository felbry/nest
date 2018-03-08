module.exports.handleResponse = function (result, response) {
    if (result.code >= 0) {
        response.json(result);
    }
    response.status(500).json(result);
}

module.exports.handleDBErr = function (err) {
    return {
        code: -1,
        data: {
            msg: err.toString()
        }
    }
}