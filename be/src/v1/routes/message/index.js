'use strict';

const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/message.controller');
const {asynHandler, protectRoute} = require('../../auth');

router.get("/users", protectRoute, asynHandler(messageController.getUsersForSidebar));
router.get("/:id", protectRoute,asynHandler(messageController.getMessages));
router.post("/send/:id", protectRoute,asynHandler(messageController.sendMessage));
module.exports = router;