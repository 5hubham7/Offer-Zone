const express = require("express");
const router = express.Router();

const customerService = require("./customer.service");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

function login(req, res) {
    customerService
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

module.exports = router;

function signup(req, res) {
    customerService
        .register(req.body)
        .then((user) => {
            console.log(user);
            res.json({
                status: 200,
                error: null,
                response: user,
            });
        })
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
