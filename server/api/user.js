const router = require("express").Router();
const {User} = require("../db");

// POST /api/user
router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser.id);
  } catch (error) {
    next(error);
  }
});

// GET /api/user
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
