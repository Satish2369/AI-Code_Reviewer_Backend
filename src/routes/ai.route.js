

const express = require("express");

const router = express.Router();
const Review = require("../controllers/ai.controller");



router.post("/get-review",Review);







module.exports = router;
