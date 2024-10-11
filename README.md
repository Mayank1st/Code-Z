To enhance your README with icons, you can use markdown and leverage image links from reliable sources (like Shields.io) to add relevant icons for each technology. Here’s the updated version with icons:

---

# Code-Z

**Code-Z** is a collaborative coding platform where users can write code and invite friends for real-time collaboration. Built using **React**, **MongoDB Atlas**, **Gemini AI**, **Socket.IO**, **Node.js**, and **Chakra UI**, it offers seamless project collaboration and code generation functionalities.

## Features

1. **Session Management using Cookies**: Efficient session handling for a smooth user experience.
2. **Credential Authentication using Bcrypt**: Secure user data with bcrypt password hashing.
3. **Responsive Design**: Utilizes **Chakra-UI** and **Bootstrap** for responsiveness across devices.
4. **Code Editor**: Supports multiple programming languages (JavaScript, PHP, Python, Java, etc.).
5. **Gemini AI Integration**: **Gemini-1.5-flash** for AI-driven code suggestions and project assistance.
6. **Real-Time Project Collaboration**: Collaborate with other developers in real-time using **Socket.IO**, with live updates and a shared coding environment.

## Tech Stack

### Frontend:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

### Backend:

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### AI:

![Gemini](https://img.shields.io/badge/Gemini%20AI-0095FF?style=for-the-badge&logo=ai&logoColor=white)

### Real-time Collaboration:

![Socket.IO](https://img.shields.io/badge/Socket.IO-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### Deployment:

- **Frontend**: ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
- **Backend**: ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Screenshots

Add screenshots of the application showing key features, such as the code editor, collaboration interface, AI code suggestions, etc.

---

## Offline Use

1. Navigate to the **Backend** folder:
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

2. Navigate to the **Frontend** folder:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## Folder Structure

```
Backend/
  ├── Config/
  │    ├── connectdb.js
  │    ├── emailConfig.js
  │    └── passport-jwt.js
  ├── Controllers/
  │    ├── AiController.js
  │    ├── codeRoomController.js
  │    └── userController.js
  ├── middlewares/
  │    └── accessToken_autoRefresh.js
  ├── models/
  │    ├── codeRoom.js
  │    ├── EmailVerification.js
  │    ├── Rooms.js
  │    ├── User.js
  │    └── UserRefreshToken.js
  ├── routes/
  │    └── userRoutes.js
  ├── sockets/
  │    └── CollaboratorSocket.js
  ├── utils/
  │    ├── generateTokens.js
  │    └── SendEmailVerification.js
  ├── app.js
  ├── package-lock.json
  └── package.json
```

## Contributing

Feel free to contribute to the project by forking the repo and submitting pull requests. Make sure to follow the contribution guidelines.

