const hellomiddleware=function(req,res,next){
console.log("hellomiddleware called")

//this is most important part
//middleware always calls next function
//rather than giving response
next();

}
module.exports=hellomiddleware;
