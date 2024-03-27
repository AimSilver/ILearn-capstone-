# Food Ordering Website using Angular

## Overview

This capstone project is a full-stack web application that allows learners to register for  online programming courses. The application is built using Angular for the frontend and Node.js for the backend, and uses MongoDB as the database. 

## Features

### 1. Learners Authentication and Registration

Learners can create an account and log in securely using their email and password. The application uses JSON Web Tokens (JWT) for authentication and bcrypt for password hashing.

### 2. Course Exploration

- **Courses:** Learners can browse through a list of courses available in home page, view details, and can enroll for courses.
- **Subscriptions:** The application provides a Subscription feature, allowing learners to check for the courses they Enrolled in.


### 3. Faculty Access

- **AUthentication:**  Faculty can login  and register .
- **Edit Button for faculty:** faculty have access to edit button through which they can update courses.


### 4. Responsive Design

- The application is designed to be responsive, ensuring a seamless experience across various devices.

## _New Features_
### 5. Profile Page

- **Profile :** Users can view their profile details on dashboard


### 6. Add/Edit course features for Admin
- **Course Management** Admins can add new courses, edit existing course. This ensures an up-to-date and curated course selection, allowing administrators to maintain a dynamic list of courses for learners.

### 7. Manage Users for Admin

- **User Management:** Admins now have the ability to manage users. This includes viewing a list of users,  user details, and blocking/unblocking user accounts. This feature ensures administrators have the necessary tools to maintain an organized user base and handle user-related tasks efficiently.

## Installation

To run the application locally, follow these steps:

1. **Clone the Repository:**
   ```
   git clone [repository-url]
   ```

2. **Frontend Setup:**
   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install`
   - Run the application: `npm start`

3. **Backend Setup:**
   - Navigate to the `backend` folder.
   - Install dependencies: `npm install`
   - Start the server: `npm start`

4. **Connect to MongoDB:**
   - Create a MongoDB Atlas account and update the connection details in the `.env` file.

<details>
<summary><strong>Things To Learn</strong></summary>

- **Observables and RxJS:**
   - Use of Observables and the RxJS library for handling asynchronous operations and events.

- **BehaviorSubject:**
   - Use BehaviorSubject to create observable data streams that retain the latest value.

- **Interceptors:**
   - HTTP interceptors to intercept and modify HTTP requests and responses globally.

- **JWT (JSON Web Tokens):**
   - Understand the concept of JWT and how it is used for secure user authentication in web applications.

- **AuthGuard:**
   - Implement an Angular route guard to control access to certain routes based on user authentication status.

</details>
