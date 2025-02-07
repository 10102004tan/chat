# Web Chat Application 💡

A real-time web chat application built using **Socket.io**, **Express.js**, and **React.js**.

## Features
- Real-time messaging with WebSockets (Socket.io)
- User authentication (JWT)
- Online user tracking
- Typing indicators
- Message history storage (optional)
- Responsive UI with React.js

## Technologies Used
- **Frontend**: React.js, Socket.io-client,Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (>= 18.x)
- npm

### Clone the repository
```sh
git clone https://github.com/your-repo/web-chat.git
cd web-chat
```

### Install dependencies
#### Backend
```sh
cd be
npm install
```
#### Frontend
```sh
cd fe
npm install
```

## Running the Application

### Start the Backend Server
```sh
cd be
npm run dev
```

### Start the Frontend
```sh
cd fe
npm run dev
```

The React app should now be running at `http://localhost:5000/` and the backend at `http://localhost:3000/`.

## Folder Structure
```
chat/
│── be/               # Backend (Express.js, Socket.io)
│   ├── .env               # Environment variables
│   ├── .gitignore         # Git ignore file
│   ├── package.json       # Dependencies
│   ├── server.js          # Main server file
│   ├── src/
│   │   ├── v1/
│   │   │   ├── app.js             # Express app setup
│   │   │   ├── auth/              # Authentication middleware and utilities
│   │   │   │   ├── index.js
│   │   │   ├── configs/           # Configuration files
│   │   │   │   ├── mongodb.config.js
│   │   │   ├── controllers/       # Route controllers
│   │   │   │   ├── access.controller.js
│   │   │   │   ├── message.controller.js
│   │   │   ├── cores/             # Core utilities and responses
│   │   │   │   ├── error.response.js
│   │   │   │   ├── success.response.js
│   │   │   ├── databases/         # Database initialization
│   │   │   │   ├── init.mongodb.js
│   │   │   ├── helpers/           # Helper functions
│   │   │   ├── models/            # Mongoose models
│   │   │   │   ├── message.model.js
│   │   │   │   ├── user.model.js
│   │   │   ├── routes/            # Express routes
│   │   │   │   ├── access/
│   │   │   │   │   ├── index.js
│   │   │   │   ├── index.js
│   │   │   │   ├── message/
│   │   │   │   │   ├── index.js
│   │   │   ├── seeds/             # Seed data
│   │   │   │   ├── user.seed.js
│   │   │   ├── services/          # Service layer
│   │   │   │   ├── access.service.js
│   │   │   │   ├── message.service.js
│   │   │   │   ├── socket.service.js
│   │   │   ├── utils/             # Utility functions
│   │   │   │   ├── index.js
│   │   │   │   ├── reasonPhrases.js
│   │   │   │   ├── statusCode.js
│── fe/               # Frontend (React.js, Socket.io-client)
│   ├── .gitignore         # Git ignore file
│   ├── eslint.config.js   # ESLint configuration
│   ├── index.html         # HTML entry point
│   ├── package.json       # Dependencies
│   ├── postcss.config.js  # PostCSS configuration
│   ├── public/            # Public assets
│   ├── README.md          # Frontend README
│   ├── src/
│   │   ├── App.jsx        # Main App component
│   │   ├── assets/        # Static assets
│   │   ├── components/    # React components
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── skeletons/
│   │   │   │   ├── MessageSkeleton.jsx
│   │   │   │   ├── SidebarSkeleton.jsx
│   │   ├── index.css      # Global CSS
│   │   ├── lib/           # Utility libraries
│   │   │   ├── axios.js
│   │   │   ├── utils.js
│   │   ├── main.jsx       # React entry point
│   │   ├── pages/         # React pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SignupPage.jsx
│   │   ├── store/         # Zustand stores
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── vite.config.js     # Vite configuration
│── README.md          # Project README

```


## API Endpoints (if applicable)
| Method | Endpoint  | Description           |
|--------|----------|-----------------------|
| POST   | /api/v1/login   | User authentication   |
| POST   | /api/v1/signup | Register a new user       |
| POST   | /api/v1/logout | Logout a user    |
| POST   | /api/v1/messages/send/:id | Send a message    |
| GET   | /api/v1/messages/users | Get users' messages      |
| GET    | /api/v1/messages/:id   | Get a specific message    |


## WebSocket Events
| Event Name | Description |
|------------|-------------|
| `newMessage`  | Broadcasts a message to all clients |
| `getOnlineUsers`   | Retrieves the list of online users |

## License
This project is licensed under the MIT License.

## Contributors
- 10102004tan ([GitHub Profile](https://github.com/10102004tan))

---
Happy coding! 🚀

