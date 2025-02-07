'use strict';

const { OK } = require('../cores/success.response');
const MessageService = require('../services/message.service');


class MessageController {

    // send message
    sendMessage = async (req, res) => {
        // code here
        return new OK({
            message: 'Message sent successfully',
            data: await MessageService.sendMessage({
                text: req.body.text,
                image: req.body.image,
                receiverId: req.params.id,
                senderId: req.user._id
            })
        }).send(res);
    };

    // get messages
    getMessages = async (req, res) => {
        // code here
        return new OK({
            message: 'Messages retrieved successfully',
            data: await MessageService.getMessages({
                userToChatId: req.params.id,
                myId: req.user._id
            })
        }).send(res);
    };

    getUsersForSidebar = async (req, res) => {
        console.log('req.user:', req.user);
        // code here
        return new OK({
            message: 'Users retrieved successfully',
            data: await MessageService.getUsersForSidebar({
                loggedInUserId: req.user._id
            })
        }).send(res);
    };
}

module.exports = new MessageController();