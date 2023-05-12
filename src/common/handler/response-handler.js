const {logger} =require('../lib');

const apiResponseHandler = ({response, message, result, code = 200, errors = null, isSuccess = true, isError = false,}) => response.status(code > 600 ? 500 : code).json({
    code,
    errors,
    message,
    result,
    isSuccess,
    isError
});


const apiErrorHandler = (err, req, res, next)=>{
    if(err !== 404){
        logger.error(err.stack);
    }
    return apiResponseHandler({
        response,
        message: err.message,
        result:null,
        code: err.status || 500,
        isSuccess:false,
        isError:true
    })
}


module.exports = {
    apiResponseHandler,
    apiErrorHandler
}