'use strict';
const { BadRequestError, InternalServerError } = require('../cores/error.response');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');

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
            user:{
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