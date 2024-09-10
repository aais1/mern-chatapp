function logger(req,res,next) {
   console.log(req.method, req.url);
   next();//to next middleware or to the controller
  }
  
  module.exports = logger;