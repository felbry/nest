module.exports.handleResponse = function (result, response) {
    if (result.code >= 0) {
        response.json(result);
    }
    response.status(500).json(result);
}

module.exports.handleDBErr = function (err) {
    return err && err.code
    ?   err
    :   {
            code: -1,
            data: {
                msg: err.toString()
            }
        };
}