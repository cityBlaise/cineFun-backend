export default  async function handleErrors(res,fn,next) { 
    try {  
      await res.json(fn);
    } catch (err) {
      console.log('une erreur s\'est  produite');
      next(err);
    } 
}