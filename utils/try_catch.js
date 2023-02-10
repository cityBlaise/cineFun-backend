export default  function handleErrors(res,fn,next) { 
    try { 
      return res.json(fn);
    } catch (err) {
      next(err);
    } 
}