'use strict';

const getReceiverSocketId =  (userId) => {
    
};

const replacePlaceHolder = (template, params) => {
	Object.keys(params).forEach((key) => {
		template = template.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
	});
	return template;
};

module.exports = {
    getReceiverSocketId,
    replacePlaceHolder,
};