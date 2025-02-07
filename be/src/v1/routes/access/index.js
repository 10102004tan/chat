'use strict';
const express = require("express");
const router = express.Router();

const accessController = require('../../controllers/access.controller');
const { asynHandler, protectRoute } = require("../../auth");

router.post('/signup', asynHandler(accessController.signUp));

router.post('/login', asynHandler(accessController.signIn));

router.post('/logout',protectRoute, asynHandler(accessController.signOut));

router.get('/check',protectRoute, asynHandler(accessController.checkAuth));

module.exports = router;
