

const express = require("express");

const router = express.Router();
const Review = require("../controllers/ai.controller");
const auth = require("../../middlewares/auth")


router.post("/get-review",auth,Review);








module.exports = router;
