console.log("Backend started");
const cors = require("cors");
const express = require("express");

const app = express();

const cookieParser = require('cookie-parser');
// Enhanced CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  
};

app.use(cors());



app.use(express.json());
app.use(cookieParser());

// Routes
const aiRoutes = require("./routes/ai.route");
const userRouter = require("./routes/userRouter");
app.use("/ai", aiRoutes);
app.use("/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = app;