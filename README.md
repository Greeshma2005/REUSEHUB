# ♻️ ReuseHub

**ReuseHub** is a full-stack donation platform designed to promote sustainability by helping people donate and request reusable items. The platform encourages community sharing while reducing waste and landfill impact.

---

## 🌐 Live Demo

🔗 [Visit ReuseHub](https://reusehub-six.vercel.app)

---

## 📦 Features

- ✅ **User Authentication** – Signup, login, JWT-based sessions.
- 👤 **User Profile** – Editable name, email, and phone number.
- 📬 **Forgot/Reset Password** – Email-based password reset via SendGrid.
- 🎁 **Donate Items** – Add item name, category, location, description, and upload images.
- 📍 **Geolocation Support** – Automatically captures user's location while donating.
- 📨 **Request Items** – Request an item by sending a message to the donor via email.
- 📤 **Upload Photos** – Upload 1–3 item images with live preview and size validation.
- 📄 **Contact Form** – Sends queries to `reusehubapp@gmail.com` using SendGrid.
- 🔒 **Protected Routes** – Routes like donate/request are accessible only after login.
- 🧠 **Middleware** – JWT authentication and Multer-based upload handling.
- 🚀 **Deployed** – Frontend on **Vercel**, Backend on **Render**.

---

## 🧰 Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React.js, Tailwind CSS            |
| Backend      | Node.js, Express.js, MongoDB      |
| Auth         | JWT (JSON Web Tokens)             |
| Email        | SendGrid, Nodemailer              |
| File Upload  | Multer                            |
| Geolocation  | Navigator API                     |
| Deployment   | Vercel (Frontend), Render (Backend)|

---

## 📁 Folder Structure

```bash
REUSEHUB/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env (excluded)
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js, index.js
│   └── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Greeshma2005/REUSEHUB.git
cd REUSEHUB
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key
```

Then run the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_BACKEND_URL=https://reusehub-api.onrender.com
```

Then run the frontend:

```bash
npm start
```

---

## 📬 Contact

For any questions or support:  
📧 reusehubapp@gmail.com

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⭐ Show Your Support

If you found this project helpful, give it a ⭐ on GitHub — it motivates me to build more awesome stuff!