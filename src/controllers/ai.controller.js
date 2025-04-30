
const main = require("../services/ai.service");


const response = async (req,res)=>{

    const code = req.body.code;

      if(!code){
        throw new Error("Enter a valid prompt");
      }

   const result = await main(code);
   return  res.status(200).send(result);
   



}

module.exports = response;
