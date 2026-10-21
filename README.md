AI Study Buddy

AI Study Buddy is a backend API built with Node.js, Express.js, and MongoDB. It manages student information through REST API endpoints.

Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

Features

- Create a student record
- View all student records
- View a student by ID
- Update a student record
- Delete a student record
- Connect to MongoDB Atlas

API Endpoints

Method| Endpoint| Description
GET| "/"| Check that the server is running
POST| "/students"| Create a student
GET| "/students"| Get all students
GET| "/students/:id"| Get a student by ID
PUT| "/students/:id"| Update a student
DELETE| "/students/:id"| Delete a student

Setup Instructions

1. Install Node.js.

2. Download or clone this project.

3. Open the project folder in a terminal.

4. Install dependencies:

   "npm install"

5. Create a ".env" file and add your MongoDB connection string:

   "MONGODB_URI=your_mongodb_connection_string"

6. Start the server:

   "npm start"

The server runs on port 5000.

Security

Keep your ".env" file and database credentials private. Never upload them to GitHub.
