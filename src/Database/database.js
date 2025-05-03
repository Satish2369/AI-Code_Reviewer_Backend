const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try{
    await mongoose.connect(process.env.CONNECTION_STRING);
  }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw new Error("Error in  connection dattabse");
    }
}


module.exports = connectToDatabase;





















