'use strict';
const { BadRequestError } = require('../cores/error.response');
const OTP = require('../models/otp.model');
const crypto = require('crypto');

class OTPService{
    static async generateTokenRandom(){
        const token  = await crypto.randomInt(10000,99999);
        return token;
    }

    static async newOTP(email){
        // check if email is already used
        const foundToken = await OTP.findOne({email:email});
        foundToken &&  await OTP.deleteOne({email:email});
        const token  = await this.generateTokenRandom();
        const newToken = await OTP.create({
            token: token,
            email: email
        });

        if(!newToken){
            throw new BadRequestError("Cannot create OTP token");
        }

        return newToken;
    }

    static async verifyOTP({email,otp}){
        const foundToken = await OTP.findOne({email
        ,token:otp});
        if(!foundToken){
            throw new BadRequestError("OTP invalid or expired");
        }
        await OTP.deleteOne({email});
        return foundToken;
    }
}

module.exports = OTPService;