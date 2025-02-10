'use strict';
const { NotFoundError, BadRequestError } = require('../cores/error.response');
const cZaloStickers = require('../helpers/cZaloStickers');
class StickerService {


    // get list categories
    static async getCategories({
        key
    }) {
        if (key){
            return cZaloStickers.filter((c) => c.name.toLowerCase().includes(key.toLowerCase()));
        }
        return cZaloStickers;
    }

    // get list stickers by category id
    static async getStickersByCategoryId(cid) {
        if (!cid) {
            throw new BadRequestError("Missing cid");
        }
        const response = await fetch(`https://stickers.zaloapp.com/cate-stickers?cid=${cid}`);
        try {
            const data = await response.json();
            return data?.value.map((s) => ({
                id: s.id,
                url: `https://zalo-api.zadn.vn/api/emoticon/sprite?eid=${s.url.split("eid=")[1].split("&")[0]}&size=130`
            }));
        } catch (error) {
            throw new NotFoundError("Not found");
        }
    }
}

module.exports = StickerService;