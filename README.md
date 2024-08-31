Overview

This project showcases the implementation of an advanced framework-based application with a focus on Authorization, Access Control, and Security. The application includes a secure Authentication API, a CRUD API for one entity, and a data visualization feature. Best practices in code quality, performance, and security are strictly followed. Additionally, comprehensive unit tests have been written to ensure the reliability of the application.


Objectives
Showcase Advanced Framework Expertise
This project demonstrates deep knowledge of modern frameworks such as Laravel and react.js with a backend and responsive frontend.

Develop and Implement Authorization and Access Control
Implemented fine-grained authorization and access control policies to restrict access based on user roles and permissions. This includes role-based access control (RBAC) for secure resource management.

Create and Implement Authentication API
Designed and developed a secure authentication API using token-based authentication ( OAuth ( Sanctum )) with features like registration, login, and logout.

Demonstrate Security Best Practices
Followed industry-standard security practices such as data encryption, secure password storage (bcrypt ), input validation, and prevention of common vulnerabilities (e.g., SQL Injection, CSRF).

Build CRUD API for One Table/Entity
Built a fully-functional CRUD API for managing a single entity (e.g., Products, Users, Categories etc.) using RESTful principles, including validation and error handling.

Design and Implement a CRUD Application with Data Visualization
React Js 

Develop and Implement User Interface (UI) with Forms and Validation
The user interface includes fully functional forms with client-side and server-side validation. The forms are responsive and designed with a focus on user experience (UX).

Write Comprehensive Unit Test Cases
Not Done

Apply Best Practices in Code Quality, Performance, and Security
Adhered to best practices for code quality, performance, and security, including:

Code reviews and linting.
Optimized database queries and API response times.
Applied security headers and CORS policies.
Followed SOLID principles and design patterns.

Project Structure  >>>>

|-- backend/
|   |-- controllers/
|   |-- models/
|   |-- services/
|   |-- tests/
|-- frontend/
|   |-- components/
|   |-- pages/
|   |-- services/
|   |-- tests/



+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Installation  >>


Backend :

Clone the repository.

`composer install`

. Set up the environment file (.env) and configure database settings.

for migrate >>>
`php artisan migrate`

for start server >>>
`php artisan serve`


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Frontend:

Navigate to the frontend/ directory.

for install dependency of project in frontend
`npm install`

for run server in frontend side to view User interface
`npm start`






