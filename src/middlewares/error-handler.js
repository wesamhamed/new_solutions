// error handler
const errorHandler = (err,req,res,next)=>{
  res.status(err.status || 500);
}

module.exports =errorHandler;