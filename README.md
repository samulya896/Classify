# Classify - College Helper App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring&logoColor=6DB33F)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

Classify is a full-stack web application designed to serve as a modern helper tool for college students. It features a secure authentication system built with a robust Spring Boot backend and an interactive, responsive frontend powered by React.

---

## ✨ Preview

Here's a glimpse of the Classify application.


<img width="1903" height="910" alt="Screenshot 2025-10-17 040239" src="https://github.com/user-attachments/assets/e49bec99-120d-4afd-b75c-95d4e3417b24" />


---

## 🚀 Features

* **Secure User Authentication:** Safe and secure user sign-up and login functionality using Spring Security.
* **JWT-based Authorization:** Stateless API secured with JSON Web Tokens for authenticated user sessions.
* **Responsive Frontend:** A clean and modern UI built with React that works seamlessly across different devices.
* **RESTful API:** A well-structured backend API for handling all application logic.

---

## 🛠️ Tech Stack

### Backend
* **Java 17+**
* **Spring Boot:** For building the REST API.
* **Spring Security:** For handling authentication and authorization.
* **MySQL:** As the relational database for storing user data.
* **Maven:** For project dependency management.

### Frontend
* **React:** For building the user interface.
* **Vite:** As the frontend build tool and development server.
* **CSS:** For styling the application.
* **Context API:** For state management.

---

## 🏁 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have the following installed on your machine:
* [Java JDK 17 or later](https://www.oracle.com/java/technologies/downloads/)
* [Apache Maven](https://maven.apache.org/download.cgi)
* [Node.js and npm](https://nodejs.org/en/)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)
* A Git client ([Git SCM](https://git-scm.com/downloads))

### 1. Clone the Repository

```bash
git clone [https://github.com/vanshmehandru/Classify.git](https://github.com/vanshmehandru/Classify.git)
cd Classify
```

### 2. Set Up the MySQL Database

1.  Open your MySQL client (like MySQL Workbench or the command-line interface).
2.  Run the following SQL commands to create the database and a dedicated user.

    ```sql
    CREATE DATABASE classifydb CHARACTER SET utf8mb4;
    CREATE USER 'classify'@'%' IDENTIFIED BY 'StrongPassword123!';
    GRANT ALL PRIVILEGES ON classifydb.* TO 'classify'@'%';
    FLUSH PRIVILEGES;
    ```

### 3. Configure and Run the Backend

1.  Navigate to the backend directory.
    ```bash
    cd classify-backend
    ```
2.  The backend is already configured to connect to the database via the `src/main/resources/application.yml` file. When the application starts, it will automatically create the necessary `users` table from `src/main/resources/schema.sql`.

3.  Run the Spring Boot application using the Maven wrapper.

    *On Windows (PowerShell or CMD):*
    ```powershell
    ./mvnw.cmd spring-boot:run
    ```

    *On macOS/Linux:*
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`. Leave this terminal running.

### 4. Configure and Run the Frontend

1.  Open a **new terminal** and navigate back to the project's root directory.
    ```bash
    # If you are in classify-backend, go back one level
    cd .. 
    ```
2.  Install the required `npm` packages.
    ```bash
    npm install
    ```
3.  Create an environment file to tell the frontend where the backend API is. Create a new file named `.env` in the root directory and add the following line:
    ```
    VITE_API_BASE_URL=http://localhost:8080
    ```
4.  Start the Vite development server.
    ```bash
    npm run dev
    ```
    Your frontend application will now be running and accessible at `http://localhost:5173` (or another port if 5173 is busy).

You can now open the application in your browser and use the Sign-Up and Login features!
