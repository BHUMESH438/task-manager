const asyncWraper = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); //here we use await to wait for the parameter promise to be resolved
    } catch (err) {
      next(err); //this will be passed to the next error handler
    }
  };
};
module.exports = asyncWraper;
//here the fn is passed as an argument and it return the same async fun (res,req) along with try and catch
//we should invoke it in all the palace
//there
