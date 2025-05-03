
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const createError = require("http-errors")

const userSchema = mongoose.Schema({

name:{
    type:String,
    required:true, 
    min:[3,"length too small"],
    max:100

},
photoUrl:{
    type:String,
    required:true,
    validate:{
        validator:(value)=>{
           return validator.isURL(value);
        },
        message:"Enter a valid photoUrl"
    }
    ,
    default:"https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
},
emailId:{
    type:String,
    required:true,
    unique:true,
    validate:{
        validator:(value)=>{

            return validator.isEmail(value);
        },
        message:"Enter a valid email"
    }
},
gender:{
   type:String,
   enum:{
    values:["Male","Female"],
    message:`{VALUE} is not supported`
   }

},
password:{
    type:String,
    required:true,
    min:[5,"length of the password is small"]
},
history:{

    type:[String],
    default:[]

}
},{timestamp:true});



userSchema.pre("save",function (next){

  const user = this;
  //bcrypt logic here


  if (!user.isModified('password')) {
    return next();
  }
 else{
       bcrypt.hash(user.password,10,function(err,hash){

         if(err){
             return next(createError(500, err.message || "password cannot be hashed"));
         }
         const hashedPassword = hash;

        user.password = hashedPassword;
        return next();
       })
 }

})





const User = mongoose.model("User",userSchema);

module.exports = User;

 