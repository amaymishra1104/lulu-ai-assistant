require("dotenv").config();

console.log("=== LULU SERVER V2 ===");

console.log(
  "GROQ KEY FOUND:",
  !!process.env.GROQ_API_KEY
);

const express = require("express");
const cors = require("cors");

const chatRoute = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Lulu AI Backend Running");
});

app.use("/chat", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});