'use strict';
const Message = require('../models/message.model');
const User = require('../models/user.model');
const { uploadImageFromFile } = require('./upload.service');

class MessageService {

    // send message
    static sendMessage = async ({ text, image, receiverId, senderId,emoji='' }) => {
        // code here

        console.log('image:', image);
        // save to clound dinary
        let imageStore;
        if (image) {
            imageStore = await uploadImageFromFile({
                path:image,
                folderName: `chatApp/${senderId}/${receiverId}`,
            });
        }

        console.log('imageStore:', imageStore);


        const newMessage = new Message({
            text,
            image: imageStore?.url,
            receiverId,
            senderId,
            emoji
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