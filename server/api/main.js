const router = require("express").Router();
const {User} = require("../db");

// GET /api/main/:userId
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        })
        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router;