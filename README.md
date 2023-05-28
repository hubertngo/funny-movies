# Project Overview:

The project aims to develop a web application with user registration and login functionalities, allowing users to share YouTube videos and view a list of shared videos. Additionally, real-time notifications will be implemented to notify logged-in users about newly shared videos.

## Key Features:

1. User Registration and Login: The web application will provide a user registration and login system.

2. Sharing YouTube Videos: Authenticated users will have the ability to share YouTube videos within the application.

3. Viewing a List of Shared Videos: Users will have access to a comprehensive list of shared videos. This list will display the shared videos, including their titles and the names of the users who shared them.

4. Real-Time Notifications for New Video Shares: When a user shares a new video, other logged-in users will receive real-time notifications about the newly shared video.

Demo link: [Live Preview](http://13.212.82.60:3000/)

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

2. Install Docker:

- Install Docker by following the instructions in this [Docker Installation Guide](https://docs.docker.com/engine/install/ubuntu/).

3. Configure Backend Settings:

- Create a `.env` file inside the `/server-node` directory with the following values:
- Update the MONGO_URL if necessary

```bash
# Port number
PORT=3001

# Mongo connection string
MONGO_URL='mongodb://127.0.0.1:27017/FunnyMovie'
```

4. Configure Frontend Settings;

- Create a `.env` file in the root folder with the following values:
- update the MONGO_URL if necessary

```bash
# Port number
PORT=3000

# API URL
NEXT_PUBLIC_API_URL='http://localhost:3001/api/v1'
```

5. Start the Project

Use the following command to set up all project dependencies, including the database, tools, and environment variables. The command enables hot refresh for automatic updates.

```bash
yarn docker:dev
```

6. Access the Application

- Open a web browser and visit http://localhost:3000 to access the application.
- The API will be available at http://localhost:3001/api/v1.
- Explore the API using the API Explorer at http://localhost:3001/explorer.
- To access the database, visit http://localhost:8888.

# Deployment

## Run Test Suite:

To run the test suite, follow these steps:

1. Navigate to the /server-node directory:

```bash
cd server-node
```

2. Start the server:

```bash
yarn start
```

3. Run the tests:
   Open a new terminal with the same directory and run

```bash
yarn test
```

## Deploy to Production:

Run the project on a production server.

```bash
yarn docker:prod -d
```
