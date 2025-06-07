
const jwt = require("jsonwebtoken");

const User = require("../src/Models/user");
const createError = require("http-errors");


const auth = async(req,res,next)=>{

     try{
        const {token} = req.cookies;
       

         if(!token){
            return next(createError(500,"Plz loggin first"))
         }

         //verify the jwt token
      
   const isTokenValid = jwt.verify(token,"CodeReviewer");

       const {_id} = isTokenValid;

       const user = await User.findOne({_id});
       if (!user) {
         return next(createError(404, "User not found"));  // 404 Not Found
       }
       req.user = user;

       next();

      

     }
     catch(error){


        return next(createError(500,err.message));


     }


}


module.exports = auth;

















