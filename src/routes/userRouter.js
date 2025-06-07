const express = require("express");
const userRouter = express.Router();
const User = require("../Models/user")
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../../middlewares/auth")



userRouter.post("/signup",async (req,res,next)=>{


   try{
      const{name,emailId,password} = req.body;

      const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return next(createError(401,"Email already exists"));
    }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      name,
      emailId,
      password: hashedPassword,
    });
 
      await newUser.save();

      // jwt token generation
     const token = jwt.sign({ _id: newUser._id }, "CodeReviewer", { expiresIn: "7d" });
 
     // Set cookie with proper configuration
     res.cookie("token", token);

     return res.send("The user has signed up successfully");
 
   }
   catch(err){
       next(createError(400, err.message || "Failed to sign up"));
   }

    



})

userRouter.post("/login", async (req, res, next) => {
   try {
     const { emailId, password } = req.body;
 
     const user = await User.findOne({ emailId: emailId });
     if (!user) {
       return next(createError(404, "User not found"));
     }
 
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return next(createError(400, "Password is wrong"));
     }
 
     // jwt token generation
     const token = jwt.sign({ _id: user._id }, "CodeReviewer", { expiresIn: "7d" });
 
     // Set cookie with proper configuration
     res.cookie("token", token);
 
     // Send a response
     return res.json({
       success: true,
       message: `${user.name}`+ "successfully loggedin",
       
     });
 
   } catch (err) {
     next(createError(500, err.message || "Login failed"));
   }
 });

 userRouter.post("/logout",auth,(req,res,next)=>{

  try{

     res.cookie("token","",{ expires:new Date(0)})

    return res.status(200).json({message:"Logged out successfully"});

  }
  catch(err){

      return next(createError(400,err.message || "Unable to logOut"));

  }
   
   



 })

 userRouter.get("/getProfile",auth,(req,res,next)=>{

           try{
 
            const {user} = req;

            const {name,emailId,history,photoUrl,gender} = user;

            res.status(200).json({data:{
              name,emailId,history,photoUrl,gender
              
            }});
           }

           catch(err){
            return next(createError(500,err.message || "unable to get the profile data"));
           }




 })
 

module.exports = userRouter;



