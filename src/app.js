console.log("Backend started");
const cors =require("cors");

const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const aiRoutes = require("./routes/ai.route");


app.get("/",(req,res)=>{

     res.send("Hello world");

});
app.use("/ai",aiRoutes);


module.exports = app;













