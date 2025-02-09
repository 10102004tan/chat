'use strict';
const { BadRequestError, InternalServerError } = require('../cores/error.response');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');
const { verifyTokenGoogle, verifyCodeGithub } = require('../helpers');

const CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';

class AccessSevice {
    static async signUp({ fullName, email, password }) {
        if (!fullName || !email || !password) {
            throw new BadRequestError("Please fill in all fields");
        }

        if (password.length < 6) {
            throw new BadRequestError("Password must be at least 6 characters");
        }

        const user = await User.findOne({ email }).lean();

        if (user) throw new BadRequestError("User already exists");

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
        });

        if (!newUser) {
            throw new BadRequestError("Invalid user data");
        }

        const token = await generateToken(newUser._id);

        await newUser.save();


        return {
            user: newUser,
            jwt: token,
        };
    }

    static async signIn({ email, password }) {
        const user = await User.findOne({ email }).lean();

        if (!user) {
            throw new BadRequestError("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new BadRequestError("Invalid credentials");
        }

        const token = await generateToken(user._id);

        return {
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            jwt: token,
        };
    }

    static async oauthWithGoogle({ idToken }) {
        const payload = await verifyTokenGoogle({ idToken });

        if (!payload.email_verified) {
            throw new BadRequestError("Email not verified");
        }
        let user = await User.findOne({ email: payload.email }).lean();
        if (!user) {
            const password = Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(password, 10);
            user = new User({
                fullName: payload.name,
                email: payload.email,
                password: hashPassword,
                profilePic: payload.picture,
            });

            await user.save();
        }

        const token = await generateToken(user._id);

        return {
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            jwt: token,
        };
    }

    static async oauthWithGithub({code}){
       const payload = await verifyCodeGithub({code});
    
       const email = payload?.emails[0]?.email;

         if (!email) {
            throw new BadRequestError("Error while signing in with Github");
         };

       let user = await User.findOne({ email}).lean();

        if (!user) {
            const password = Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(password, 10);
            const { name, avatar_url } = payload;
            console.log('payload', email, name, avatar_url);
            user = new User({
                fullName: name,
                email,
                profilePic:avatar_url,
                password: hashPassword,
            });

            await user.save();
        }

        const token = await generateToken(user._id);

        return {
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            jwt: token,
        };
       
    }

    static async signOut() {
        return {
            message: 'Sign out success',
        };
    }
}

module.exports = AccessSevice;