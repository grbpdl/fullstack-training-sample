const three=function(req,res,next){
console.log("three called")

//this is most important part
//middleware always calls next function
//rather than giving response
next();

}
module.exports=three;
