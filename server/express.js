const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "*" }));

app.use("/seller", require("./seller/seller.controller"));

const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
app.listen(port, () => console.log("Server listening on port " + port));
