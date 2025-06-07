const main = require("../services/ai.service");
const generateTitle = require("../services/aiTitle.service.js");

const response = async (req, res) => {
    try {
        const { code } = req.body;
        const { user } = req;

        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const reviewCode = await main(code);
        const codeTitle = await generateTitle(code);


        // Update user history
        user.history.push(codeTitle);






        
        await user.save(); 
   
        return res.status(200).json({ reviewCode, codeTitle });

    } catch (error) {
        console.error("Error in response controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = response;