const express = require("express");
const router = express.Router();

const sellerService = require("./seller.service");

router.post("/signup", signup);

module.exports = router;

function signup(req, res) {
    sellerService
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
