# 🎓 Student Management System

A full-stack **Student Management System** built using **Spring Boot (backend)** and **React (frontend)**.  
This application lets users **add, edit, view, and delete student records** through a simple, responsive web interface.

The project is fully deployed — backend on **Railway** and frontend on **Netlify**.

---

## 🚀 Live Demo

🔹 **Frontend:** [https://student-management-fronten.netlify.app](https://student-management-fronten.netlify.app)  
🔹 **Backend:** [https://student-management-production-4c9e.up.railway.app](https://student-management-production-4c9e.up.railway.app)

---

## 🧩 Features

✅ Add new student records  
✅ Edit existing student details  
✅ Delete student entries  
✅ Fetch and display all students dynamically  
✅ Simple login interface  
✅ Fully responsive UI  
✅ Hosted frontend & backend  
✅ Proper CORS configuration  

---

## 🏗️ Tech Stack

**Frontend:**
- React.js  
- Axios  
- CSS  

**Backend:**
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- MySQL / PostgreSQL
- Repo for Backend - https://github.com/swarajjogi/student-management

**Deployment:**
- Railway (Backend)  
- Netlify (Frontend)

---

---

## ⚙️ How It Works

1. The React frontend communicates with the Spring Boot backend via Axios.  
2. Spring Boot handles CRUD operations and interacts with the database using JPA.  
3. CORS is configured to allow requests only from the Netlify frontend.  
4. React manages state updates and refreshes the student list after operations.

---

## 🧠 Key Learnings

- Connecting React frontend with a Spring Boot backend  
- Handling CORS and environment variables  
- Deploying full-stack apps on **Railway** and **Netlify**  
- Designing RESTful APIs using Spring Boot  

---

## 🧰 API Endpoints

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | `/students`        | Fetch all students      |
| POST   | `/students`        | Add a new student       |
| PUT    | `/students/{id}`   | Update an existing one  |
| DELETE | `/students/{id}`   | Delete a student        |

---

## 💻 Run Locally

### 1️⃣ Backend
```bash
cd backend
mvn spring-boot:run
```

### 2️⃣ Frontend
```bash
cd frontend
npm install
npm start
```
- Update baseURL in src/api.js with your backend URL if running locally.

- Screenshot
<img width="1912" height="973" alt="image" src="https://github.com/user-attachments/assets/c0a0b9c8-6824-4121-ad4d-207f49f58567" />

## ✍️ Author

👤 **Swaraj Jogi**  
📧 [swrajjogi@gmail.com](mailto:swrajjogi@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/swaraj-jogi-92950322b/)  
💻 [GitHub](https://github.com/swarajjogi)

