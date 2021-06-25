const router = require("express").Router();
const {Alert} = require("../db");

// GET /api/alert
router.get("/", async (req, res, next) => {
  try {
    const alert = await Alert.findOne({
        where: {
          id: req.body.id,
        },
      });
    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
});

module.exports = router;