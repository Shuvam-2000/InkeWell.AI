# 🧠 AI-Powered Blogging Platform (MERN Stack)

A full-stack, AI-integrated blogging platform where admins can manage blogs and comments, while users can read, search, and comment on posts. AI capabilities are powered by **Google Gemini API** to generate blog summaries. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🔥 Features

### 👨‍💼 Admin Panel
- Add new blogs
- Publish & Unpublish blogs
- Approve & Delete comments
- Auto-generate blog summaries using AI (Gemini API)

### 🌐 User Features
- Read published blogs
- Comment on blogs
- Search blogs by name or category

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini API
- **Authentication:** JWT-based system
- **Deployment:** Easily deployable with `client` and `server` structure

---

## 🚀 Getting Started

### 📁 Project Structure
/client → Frontend (React)
/server → Backend (Node.js + Express)


---

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Google Gemini API key

---

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-blog-platform.git
   cd ai-blog-platform

2 . **Install Dependencies**
cd client
npm install
cd ../server
npm install

### ENV VAR 
PORT=8000
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password
IMAGEKIT_PUBLIC_KEY=your_image_public_key
IMAGEKIT_PRIVATE_KEY=your_image_private_key
IMAGEKIT_URL_ENDPOINT=your_image_url_endpoint
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key

### Runing the APP
1 . **Client**
  cd client
  npm run dev

2 . **Server**
  cd server
  npm start


