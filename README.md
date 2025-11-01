# 👩‍💼 Employee Management App

A **cross-platform mobile application** built using **React Native**, **Redux**, **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary** to manage employee records seamlessly.  
This app allows you to **add, edit, view, and delete employee details** such as name, position, salary, phone number, and profile photo — all with a clean UI and smooth experience.

---

## ✨ Features

- ➕ Add, edit, and delete employee records  
- 📷 Upload profile images using **Cloudinary**  
- 📱 Integrated device **camera and gallery** access  
- 👁️ View detailed employee profiles  
- 🔄 State management with **Redux**  
- 🌐 RESTful backend with **Node.js** and **Express.js**  
- 💾 Data storage with **MongoDB**  
- ⚡ Fully responsive and cross-platform (Android & iOS)

---

## 🧠 Tech Stack

### **Frontend (Mobile App)**
- React Native 
- Redux
- React Navigation
- Async Storage
- Fetch API

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image storage)
- CORS & dotenv

---

## 🖼️ App Screenshots

### 🏠 Employee List  
Displays all employees with their photos, names, and job titles.  
<img  width="312" height="637" alt="Image" src="https://github.com/user-attachments/assets/aeceffde-785b-4c0e-bcc1-d90a126e764f" alt="Employee List Screen" />

---

### ➕ Create Employee  
Form to add new employee details and upload profile image to Cloudinary.  
<img  width="312" height="637" alt="Image" src="https://github.com/user-attachments/assets/25e48385-d5fa-4c89-b956-40360e1bd244" alt="Employee List Screen" />

---

### 👤 Employee Profile  
Displays the employee’s details such as email, phone number, and salary, with options to edit or delete.  
<img width="312" height="637" alt="Image" src="https://github.com/user-attachments/assets/ae9440e1-fa5a-4375-bb68-db5de18a942e" alt="Employee Profile Screen" />

---
## ⚙️ Installation & Setup Guide

Follow these steps to set up and run the Employee Management App on your local machine.

### 🧩 Prerequisites  
- Node.js (v14 or above)  
- npm or yarn  
- MongoDB (or MongoDB Atlas)  
- Expo CLI for running the React Native app  
- Cloudinary account for image uploads

### 🧩 Clone the Repository
```bash
git clone https://github.com/Vanshika-RJIT/employeesApp.git
cd employeesApp
```
  
### 🚀 Backend Setup (Server)  
1. Navigate to the backend folder:  
    ```bash
    cd server
    ```  
2. Install dependencies:  
    ```bash
    npm install
    ```  
3. Create a `.env` file inside the `server` folder and add the following:  
    ```bash
    MONGO_URI=your_mongodb_connection_string
    CLOUD_NAME=your_cloudinary_cloud_name
    API_KEY=your_cloudinary_api_key
    API_SECRET=your_cloudinary_api_secret
    ```  
4. Start the backend server:  
    ```bash
    npm start
    ```  
### 📱 Frontend Setup (React Native)  
1. Navigate to the client folder:  
    ```bash
    cd client
    ```  
2. Install dependencies:  
    ```bash
    npm install
    ```  
3. Update your backend URL in the frontend (if required) — e.g., change the API base URL to your local machine’s IP if using a physical device.  
4. Start the React Native development server:  
    ```bash
    npm start
    ```  
---

## ☁️ Cloudinary Integration  
All profile photos are securely uploaded and stored using **Cloudinary**.

To configure Cloudinary:  
1. Sign up at [https://cloudinary.com](https://cloudinary.com)  
2. Copy your Cloud Name, API Key, and API Secret  
3. Add them to your `.env` file in the backend (as shown above)  

### 🔧 Optional: Unsigned Upload (frontend only)  
If you want the app to upload images directly from the frontend (without exposing your API secret):  
- In Cloudinary Dashboard → Settings → Upload → Upload Presets  
- Create a new Upload Preset → set it to **Unsigned** → optionally set a folder name  
- Use the preset name in your frontend upload logic  

---
