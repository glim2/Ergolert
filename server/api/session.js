const router = require("express").Router();
const {Session} = require("../db");

// POST /api/session
router.post("/", async (req, res, next) => {
  try {
    const newSession = await Session.create(req.body);
    res.status(201).json(newSession);
  } catch (error) {
    next(error);
  }
});

module.exports = router;