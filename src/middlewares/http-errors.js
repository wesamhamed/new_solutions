const createError = require('http-errors')
// catch 404 and forward to error handler

const customHttpError =(errorStatus)=(req,res,next)=>{
            next(createError(errorStatus));
}

module.exports = customHttpError;