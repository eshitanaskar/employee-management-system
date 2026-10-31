# Employee Management System

A web-based Employee Management System developed using Java, Spring Boot, MySQL, HTML, CSS and JavaScript.

## Features

* Add new employees
* View all employees
* Search employees by name
* Update employee details
* Delete employee records
* Duplicate Employee ID verification – prevents adding employees with an existing ID.
* Dashboard showing total employees
* Dashboard showing total departments
* Calculate average employee salary
* Store employee data in MySQL database

## Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Frontend

* HTML
* CSS
* JavaScript

### Tools

* Visual Studio Code
* Maven
* Git and GitHub

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/eshitanaskar/employee-management-system.git
```

### 2. Open the Project

Open the cloned `employee-management-system` folder in Visual Studio Code.

### 3. Configure MySQL

* Create a MySQL database named `employee_db`.
* Configure your MySQL username and password in `application.properties`.
* Use `application-example.properties` as a reference.

### 4. Run the Application

Open the terminal in the project root folder and execute:

```powershell
.\mvnw.cmd spring-boot:run
```

### 5. Open in Browser

Visit:

`http://localhost:8080`

## API Endpoints

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/employees`      | Get all employees       |
| GET    | `/api/employees/{id}` | Get employee by ID      |
| POST   | `/api/employees`      | Add a new employee      |
| PUT    | `/api/employees/{id}` | Update employee details |
| DELETE | `/api/employees/{id}` | Delete an employee      |

## Project Overview

The Employee Management System is a web-based application designed to simplify employee record management.

It allows users to add, view, search, update and delete employee information. The dashboard also displays employee statistics such as total employees, total departments and average salary.

The application uses Spring Boot for backend development and MySQL for data storage.

