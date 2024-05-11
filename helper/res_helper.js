module.exports = function resHelper(res, data, message = "process successful", statusCode = true,){
    res.send({
        status: statusCode ? "success" : "fail",
        message: message,
        data: data
    });
}