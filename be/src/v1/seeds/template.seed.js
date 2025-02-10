'use strict';

const Template = require("../models/template.model");
const { htmlEmailToken, htmlResetPassword } = require("../utils/template.html");
const mongoose = require('../databases/init.mongodb');

const seedTemplates = [{
    name: 'EMAIL_TOKEN',
    html: htmlEmailToken,
    status: 'active'
}, {
    name: 'EMAIL_RESET_PASSWORD',
    html: htmlResetPassword,
    status: 'active'
}];

const seedDatabase = async () => {
    try {
        await Template.deleteMany({});
        await Template.insertMany(seedTemplates);
    } catch (error) {
        console.log(error);
    }
};
seedDatabase();