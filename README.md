# Project Overview:

The project aims to develop a web application with user registration and login functionalities, allowing users to share YouTube videos and view a list of shared videos. Additionally, real-time notifications will be implemented to notify logged-in users about newly shared videos.

## Key Features:

1. User Registration and Login: The web application will provide a user registration and login system.

2. Sharing YouTube Videos: Authenticated users will have the ability to share YouTube videos within the application.

3. Viewing a List of Shared Videos: Users will have access to a comprehensive list of shared videos. This list will display the shared videos, including their titles and the names of the users who shared them.

4. Real-Time Notifications for New Video Shares: When a user shares a new video, other logged-in users will receive real-time notifications about the newly shared video.

# Core technologies

## Backend

1. Node JS (recommended using LTS version 18.12.1)
2. Docker (version > 20.10)
3. MongoDB (version 4.2.1)
4. Loopback 3 (framework)

## Frontend

1. React (version 18.2.0)
2. Next.js (version 13.2.4)
3. Tailwindcss
4. Ant Design (antd.design)
5. Zustand (state management)

# Installation & Configuration

1. Clone the Repository:

```bash
git clone https://github.com/hubertngo/funny-movies.git
cd funny-movies
```

2. Install Docker from this link: https://docs.docker.com/engine/install/ubuntu/

3. Configure Backend Settings:

- create `.env` file inside `/server-node` with below values:
- update MONGO_URL if necessary

```bash
# Port number
PORT=3001

# Mongo connection string
MONGO_URL='mongodb://127.0.0.1:27017/FunnyMovie'
```

4. Configure Frontend Settings;

- create `.env` file in root folder with the below values:
- update MONGO_URL if necessary

```bash
# Port number
PORT=3000

# API URL
NEXT_PUBLIC_API_URL='http://localhost:3001/api/v1'
```

5. Start the Project

- this command will setup all the dependencies of the project including database, tools and environment variables. This also offer hot refresh every time the source code has updates.

```bash
yarn docker:dev
```

6. Access the Application

- Open a web browser and visit http://localhost:3000 to access the application.
- API will available at http://localhost:3001/api/v1
- API Explorer: http://localhost:3001/explorer
- To check the database http://localhost:8888

# Deployment

1. USE `yarn test` to run the test suite
2.
