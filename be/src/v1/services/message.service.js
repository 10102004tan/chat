'use strict';
const Message = require('../models/message.model');
const User = require('../models/user.model');

class MessageService {

    // send message
    static sendMessage = async ({ text, image, receiverId, senderId }) => {
        // code here

        // save to clound dinary

        const newMessage = new Message({
            text,
            image: '',
            receiverId,
            senderId
        });

        await newMessage.save();

        // socket io
        const receiverSocketId = _userSocketMap[receiverId];
        console.log('receiverSocketId:', _userSocketMap);
        if (receiverSocketId) {
            _io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        return newMessage;
    };

    // get messages
    static getMessages = async ({
        userToChatId,
        myId,
    }) => {
        // code here
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId,
                },
                {
                    senderId: userToChatId,
                    receiverId: myId,
                },
            ],
        }).sort({ createdAt: 1 });

        return messages;
    };

    // get user side bar
    static getUsersForSidebar = async ({ loggedInUserId }) => {
        // console.log('loggedInUserId:', loggedInUserId);
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return filteredUsers;
    };
};

module.exports = MessageService;