https://final-frontend-psi.vercel.app/

HealthLink – MERN Stack Web Application
HealthLink is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) for managing hospital departments, appointments, and user feedback. This project demonstrates authentication, RESTful APIs, and integration with MongoDB Atlas.

Table of Contents
Features

Tech Stack

Getting Started

Environment Variables

Available Scripts

API Endpoints

Deployment

License

Features

User registration and login with secure authentication

CRUD operations for departments and appointments

Submit and store user feedback

MongoDB Atlas connection for persistent data

CORS configuration for frontend-backend communication

Health check endpoint to monitor API status


Tech Stack

Frontend: React.js, Axios, CSS

Backend: Node.js, Express.js, Mongoose

Database: MongoDB Atlas

Deployment: Render.com (backend), Vercel/Render (frontend)

Other: dotenv for environment variables, CORS

Getting Started
Clone the repository
bash
git clone https://github.com/mkmattymatty/final-backend.git
cd final-backend

Install dependencies
bash
npm install

Set up environment variables
Create a .env file in the root directory:
.env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/project?retryWrites=true&w=majority
ALLOWED_ORIGINS=http://localhost:3000


Start the server (local development)
bash
npm start

Frontend

Navigate to your React frontend folder and run:
bash
npm install
npm start

Ensure REACT_APP_API_URL points to your backend URL in .env:
.env
REACT_APP_API_URL=http://localhost:5000/api


Environment Variables
Variable Name	Description
MONGO_URI	MongoDB Atlas connection string
PORT	Server port number (default 5000)
ALLOWED_ORIGINS	Comma-separated list of allowed frontend URLs

Frontend .env:

Variable Name	Description
REACT_APP_API_URL	Base URL of backend API


Available Scripts
Backend

npm start – Start server locally

node server.js – Run server manually

Frontend

npm start – Start React app locally

npm run build – Build React app for production

API Endpoints

Auth

POST /api/auth/register – Register a new user

POST /api/auth/login – Login user

Departments

GET /api/departments – List all departments

POST /api/departments – Create a department

Appointments

GET /api/appointments – List appointments

POST /api/appointments – Create appointment

Feedback

POST /api/feedback – Submit feedback

Health

GET /api/health – Check API status

Deployment

Backend hosted on Render.com

Frontend hosted on Vercel or Render (React app)

Ensure environment variables are correctly set in your deployment platform

License

This project is open-source and available under the MIT License.

