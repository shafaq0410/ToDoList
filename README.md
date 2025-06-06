# ToDo List App

A simple ToDo List web application built with Node.js, Express, EJS templating, and MongoDB Atlas for data storage.

---

## Features

- Add and delete tasks
- Daily reset of the default tasks
- Separate work list
- Responsive UI using EJS and CSS
- MongoDB Atlas integration for persistent data storage

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose (MongoDB ODM)
- EJS (Embedded JavaScript templating)
- Body-parser
- Git & GitHub for version control
- Vercel for deployment (optional)

---

## Screenshots 
![image](https://github.com/user-attachments/assets/63cd6ef7-73de-4f05-91f8-0166fddbe234)
![image](https://github.com/user-attachments/assets/367675bb-1371-4928-8a35-07c90cb06f7b)
![image](https://github.com/user-attachments/assets/00bc9274-077f-4d0b-983a-a1e80a30381d)



## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- A MongoDB Atlas cluster with your connection URI
- Git installed for version control
- GitHub account and repository for code hosting

---

### Local Development

1. Clone the repo

bash
git clone https://github.com/shafaq0410/ToDoList.git
cd ToDoList
 
2. Install the dependencies:

bash
npm install
Create a .env file in the root directory and add your MongoDB connection string:

ini
MONGODB_URI=your_mongodb_connection_string_here
Start the application locally:

bash
npm start
Open your browser and navigate to:

arduino
http://localhost:5000 

Important Notes
Ensure your MongoDB Atlas cluster allows connections from your IP address or use 0.0.0.0/0 for testing (be cautious with this setting).

Never commit your .env file or any sensitive credentials to public repositories — keep your secrets safe!

The app automatically resets your task list every day based on the current date, helping you stay fresh and focused.

License
This project is licensed under the MIT License.

Author
Shafaq Ali

⭐ Feel free to star this project and contribute!
