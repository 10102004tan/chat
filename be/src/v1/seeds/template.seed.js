'use strict';

const seedDatabase = require("../databases/init.seed.mongodb");
const Template = require("../models/template.model");
const {htmlEmailToken} = require("../utils/template.html");

const seedTemplates = [{
    name: 'EMAIL_TOKEN',
    html:htmlEmailToken,
    status: 'active'
}];

const func = async () => {
    await Template.deleteMany({});
    await Template.insertMany(seedTemplates);
};
seedDatabase(func);