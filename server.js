 require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/Database/database");




connectToDatabase()
  .then(() => {
    console.log("Connected to the database successfully!");
     app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
     })

}).catch((error) => {
    
     console.log("error Connecting to the database "+ error)
  });





