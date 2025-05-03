console.log("Backend started");
const cors =require("cors");

const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const aiRoutes = require("./routes/ai.route");
const userRouter = require("./routes/userRouter");



app.use("/ai",aiRoutes);
app.use("/users",userRouter);

app.use((err,req,res,next)=>{

  res.status(err.status || 500).json({message:err.message});

    
})



module.exports = app;













