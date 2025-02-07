'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
	cors:{
		origin: '*',
	}
});
const socketService = require('./services/socket.service');

// global variable
global.__basedir = __dirname;
global._io = io;
global._userSocketMap = {};


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
// cors
app.use(require('cors')({
	origin: 'http://localhost:5173',
	credentials: true,
}));


// database
require('./databases/init.mongodb');

// socket
_io.on('connection', socketService.connection);

/* ROUTES START*/

app.use('/', require('./routes'));


app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
	console.log('error', error);
	return res.status(statusCode).json({
		status: 'error',
		statusCode: statusCode,
		stack: error.stack,
		message: error.message || 'Internal Servel Error',
	});
});

module.exports = server;
