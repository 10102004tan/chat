"use strict";

const express = require("express");
const router = express.Router();
const {protectRoute, asynHandler} = require("../auth");

router.get("/", (req, res) => {
    res.sendFile(__basedir + "/index.html");
});

router.use("/api/v1/messages",require("./message"));
router.use("/api/v1/auth",require("./access"));

module.exports = router;