# Todo App API - Node.js & Express.js

This is a **Todo App REST API** built with **Node.js**, **Express**, and **MongoDB**, featuring **JWT-based authentication**. This project was developed as part of a **Node.js Developer Assessment** for BFIN IT.

## Live Demo

-  **Vercel Live URL:**  [https://todo-apps-ten-eta.vercel.app/](https://todo-apps-ten-eta.vercel.app/)

-  **GitHub Repository:**  [https://github.com/fardeenahmed2002/todo-apps](https://github.com/fardeenahmed2002/todo-apps)
> The API is fully functional and ready for testing with Postman or any HTTP client.

## Features
-  **User Authentication:** Signup & Login using JWT tokens.
-  **Password Security:** Passwords are securely hashed with `bcrypt`.
-  **Todo CRUD:** Create, Read, Update, Delete todos.
-  **Protected Routes:** Only authenticated users can access their todos.
-  **Ownership Validation:** Users can only manipulate their own todos.
-  **Error Handling:** Proper HTTP status codes with descriptive messages.

## Tech Stack

 
-  **Backend:** Node.js, Express.js
-  **Database:** MongoDB (via Mongoose)
-  **Authentication:** JWT (JSON Web Tokens)
-  **Password Hashing:** bcryptjs
-  **Environment Management:** dotenv
-  **CORS Handling:** cors

## Setup Instructions

Clone the repository:
git clone https://github.com/yourusername/todo-apps.git

 - cd todo-apps
 - npm install
 - npm run dev
 
Server will start on: http://localhost:5000

## Project Structure

/todo-apps  
├── /src  
│ ├── /config # Database connection  
│ ├── /controllers # Auth and Todo controllers  
│ ├── /routes # API routes  
│ ├── /models # Mongoose schemas (User, Todo)  
│ ├── /middleware # Auth middleware  
│ └── app.js # Main application entry point  
├── .env # Environment variables  
├── package.json  
└── README.md

## API Endpoints
**Auth**

 1. Register a new user

		POST
		/api/auth/signup
    example

 
			{
			  "name": example
			  "email": "john@example.com",
			  "password": "123456"
			}
 - Login and get JWT token

	    POST
	    /api/auth/login
	    
 example

	     {
	     "email": "john@example.com",
	     "password": "123456"
	     }

**CRUD**	   

 1.  POST
		- /api/todos
		- Create a new todo
example 
			
			    {
				 "title": "My first todo",
				 "description": "This is a test todo"
			    }

 2. GET
- /api/todos
- Get all todos of the user
 3. PUT
- /api/todos/:id
- Update a todo by ID
 4. DELETE
- /api/todos/:id
- Delete a todo by ID


