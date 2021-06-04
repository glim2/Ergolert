const router = require("express").Router();
const {User} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/auth
router.post("/", async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({where: {username}})
        if (bcrypt.compare(password, user.password)) {
            const userId = await User.authenticate({
              username,
              password: user.password,
            });

            const token = jwt.sign({userId: userId}, 'secret');
            res.send(token);
        }
    } catch (error) {
        next(error)
    }
})

// GET /api/auth
router.get("/", async (req, res, next) => {
    try {
        const verifiedUser = jwt.verify(req.headers.authorization, 'secret');
        const user = await User.byToken(verifiedUser.userId);
        res.send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router;