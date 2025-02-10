'use strict';

const StickerService = require("../services/sticker.service");
const {OK} = require("../cores/success.response");

class StickerController {
    async getCategories(req, res) {
        return new OK(
            {
                message: "Success",
                data: await StickerService.getCategories({
                    key: req.query.key
                })
            }
        ).send(res);
    }

    async getStickersByCategoryId(req, res) {
        return new OK(
            {
                message: "Success",
                data: await StickerService.getStickersByCategoryId(req.params.cid)
            }
        ).send(res);
    }
}

module.exports = new StickerController();