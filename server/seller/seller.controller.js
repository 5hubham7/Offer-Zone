const express = require("express");
const router = express.Router();

const sellerService = require("./seller.service");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

function login(req, res) {
    sellerService
        .login(req.body)
        .then((user) => {
            console.log(user);
            res.json({
                status: 200,
                error: null,
                response: user,
            });
        })
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function signup(req, res) {
    sellerService
        .signup(req.body)
        .then((user) => {
            console.log(user);
            res.json({
                status: 200,
                error: null,
                response: user,
            });
        })
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}
