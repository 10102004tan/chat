'use strict';
const express = require('express');
const router = express.Router();
const {asynHandler, protectRoute} = require('../../auth');
const stickerController = require('../../controllers/sticker.controller');

router.get('/categories',asynHandler(stickerController.getCategories));
router.get('/:cid',asynHandler(stickerController.getStickersByCategoryId));

module.exports = router;
