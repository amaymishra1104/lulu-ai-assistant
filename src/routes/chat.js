const express = require("express");

const router = express.Router();

const routeMessage =
require("../services/routerService");

const {
  saveMessage,
  getHistory
} = require("../services/memoryService");

router.post("/", async (req, res) => {

  console.log("POST /chat HIT");

  try {

    const {
      message,
      userId = "default"
    } = req.body;

    // Save user message
    saveMessage(
      userId,
      "user",
      message
    );

    // Get response
    const answer =
      await routeMessage(
        message,
        userId
      );

    // Save assistant response
    saveMessage(
      userId,
      "assistant",
      answer
    );

    res.json({
      success: true,
      answer,
      history:
        getHistory(userId)
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

module.exports = router;