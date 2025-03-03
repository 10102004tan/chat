'use strict';

const { UnauthorizedError } = require('../cores/error.response');
const { CREATED, OK } = require('../cores/success.response');
const AccessSevice = require('../services/access.service');

class AuthController {
    /**
     * This is a function to sign up
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    signUp = async (req, res, next) => {
        console.log('req.body', req.body);
        return new CREATED({
            message: 'Sign up success',
            data: await AccessSevice.signUp(req.body).then((data) => {
                res.cookie('jwt', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return data.user;
            })
        }).send(res);
    }

    /**
     * This is a function to sign in
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    signIn = async (req, res, next) => {
        return new OK({
            message: 'Sign in success',
            data: await AccessSevice.signIn(req.body).then((data) => {
                res.cookie('jwt', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return data.user;
            })
        }).send(res);
    }


    oauthWithGoogle = async (req, res, next) => {
        return new OK({
            message: 'Sign in with google success',
            data: await AccessSevice.oauthWithGoogle(req.body).then((data) => {
                res.cookie('jwt', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return data.user;
            })
        }).send(res);
    };

    oauthWithGithub = async (req, res, next) => {
        return new OK({
            message: 'Sign in with Github success',
            data: await AccessSevice.oauthWithGithub(req.body).then((data) => {
                res.cookie('jwt', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return data.user;
            })
        }).send(res);
    };

    /**
     * This is a function to sign out
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    signOut = async (req, res, next) => {
        res.cookie('jwt', '', { maxAge: 1 });
        return new OK({ message: "Sign out success" }).send(res);
    }

    /**
     * Check authentication
     */
    checkAuth = async (req, res, next) => {
        return new OK({
            message: 'Check auth success',
            data: req.user
        }).send(res);
    }

    /**
     * Forgot password
     */
    forgotPassword = async (req, res, next) => {
        return new OK({
            message: 'Forgot password success',
            data: await AccessSevice.forgotPassword(req.body)
        }).send(res);
    };   


    /**
     * Reset password
     */

    resetPassword = async (req, res, next) => {
        return new OK({
            message: 'Reset password success',
            data: await AccessSevice.resetPassword(req.body)
        }).send(res);
    };
}

module.exports = new AuthController();