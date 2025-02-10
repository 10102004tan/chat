'use strict';

const { model, Schema } = require('mongoose');

const templateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = model('Template', templateSchema);