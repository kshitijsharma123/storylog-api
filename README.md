# 📚 Storylog API

The **Storylog API** is a RESTful backend service built with **Node.js**, **Express.js**, and **JWT** authentication. It provides user authentication endpoints and serves as the backend for the Storylog platform — a place where users can create, share, and manage stories.

---

## 🚀 Features

- 🔐 User Registration & Login with secure password handling
- 🛡️ JWT-based authentication
- 🧩 Modular Express routes
- 📁 Environment configuration support
- 🧪 Postman documentation for quick testing

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **dotenv**
- **(MongoDB or other DB)** – _Pluggable depending on future data storage_

---

## 🧾 Getting Started

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/kshitijsharma123/storylog-api.git
cd storylog-api
```

### 2. 📦 Install Dependencies

```bash
npm install
```

### 3. ⚙️ Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

> Replace `your_secret_key_here` with a strong secret for token signing.

### 4. ▶️ Run the Server

```bash
npm start
```

Server will be running at `http://localhost:3000`

---

## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | `/api/auth/register`   | Register a new user    |
| POST   | `/api/auth/login`      | Login and receive JWT  |
| POST   | `/api/auth/logout`     | Logout the user        |

> For detailed testing, import the [Postman Collection](#) 

---

## 🧪 Testing with Postman

- Use the **Postman collection** provided in this repo or your documentation.
- Set `{{base_url}}` to `http://localhost:3000`
- Add JWT token to protected routes using the `Authorization: Bearer {{token}}` header.

---

## 📌 Future Enhancements

- 📝 Story creation and management
- 🗂️ User profiles
- 📊 Analytics and insights


---

## 👨‍💻 Author

**Kshitij Sharma**  
[GitHub](https://github.com/kshitijsharma123)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
