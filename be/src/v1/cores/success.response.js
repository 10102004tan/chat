'use strict';

const StatusCode = require('../utils/statusCode');
const ReasonStatusCode = require('../utils/reasonPhrases');

class SuccessResponse {
    constructor({message,data={},statusCode = StatusCode.OK,reasonStatusCode = ReasonStatusCode.OK}){
        this.message = message ? message : reasonStatusCode;
        this.data = data;
        this.reasonStatusCode = reasonStatusCode;
        this.statusCode = statusCode;
    }
    send(res){
        // set cookie
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({message,data}){
        super({message,data});
    }
}

class CREATED extends SuccessResponse {
    constructor({message,data,status = StatusCode.CREATED,reasonStatusCode = ReasonStatusCode.CREATED}){
        super({message,data,status,reasonStatusCode});
    }
}

module.exports = {
    OK,
    CREATED
};