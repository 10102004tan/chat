"use strict";
const { NotFoundError } = require('../cores/error.response');
const Template = require('../models/template.model');

const getTemplateByName = async (name) => {
    const template = await Template.findOne({ name }).lean();
    if (!template) {
        throw new NotFoundError("Template not found");
    }
    return template;
};

module.exports = {
    getTemplateByName
};