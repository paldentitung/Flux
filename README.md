# Flux

A full-stack social media web application built with the MERN stack, featuring real-time notifications, post reactions, follow system, and more.

---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://flux-delta-snowy.vercel.app/)

---

## 📸 Screenshots

### Login

![Login](./frontend/src/assets/login.png)

### Home Page

![Home](./frontend/src/assets/home.png)

### Profile

![Profile](./frontend/src/assets/profile.png)

---

## ✨ Features

- **Authentication** — Register, login, forgot/reset password with OTP email verification
- **Posts** — Create posts with multiple image uploads, reaction picker (like, love, haha, etc.)
- **Comments** — Nested comment system with likes
- **Real-time Notifications** — Instant notifications via Socket.io with sound alerts
- **Follow System** — Follow/unfollow users, followers/following modals
- **Profile** — Edit profile, avatar upload, profile image lightbox
- **Search & Explore** — Search users and discover content
- **Settings** — Change password, manage account preferences
- **Responsive UI** — Mobile-friendly with bottom navigation

---

## 🛠️ Tech Stack

### Frontend

| Tech                  | Usage                   |
| --------------------- | ----------------------- |
| React 19 + TypeScript | UI framework            |
| Vite                  | Build tool              |
| Socket.io Client      | Real-time features      |
| React Router v6       | Client-side routing     |
| Context API           | Global state management |

### Backend

| Tech               | Usage                   |
| ------------------ | ----------------------- |
| Node.js + Express  | REST API server         |
| MongoDB + Mongoose | Database                |
| Socket.io          | Real-time notifications |
| Cloudinary         | Image storage           |
| JWT                | Authentication          |
| Nodemailer         | OTP email delivery      |
| bcrypt             | Password hashing        |

---

## 📁 Project Structure

```
flux/
├── frontend/          # React + TypeScript client
│   └── src/
│       ├── features/  # Auth, posts, comments, notifications, profile, search
│       └── shared/    # Layouts, UI components, hooks, services
└── backend/           # Node.js + Express server
    └── modules/       # Auth, posts, comments, notifications, users, search
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Cloudinary account

### Installation

```bash
# Clone the repo
git clone https://github.com/paldentitung/flux
cd flux

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

**Backend `.env.local`**

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

**Frontend `.env.development`**

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Run

```bash
# Run backend
cd backend
npm run dev

# Run frontend (new terminal)
cd frontend
npm run dev
```

App runs at `http://localhost:5173`

---

## 👤 Author

**Palden Dorje Titung**

- Portfolio: [paldendorjetitung.com.np](https://www.paldendorjetitung.com.np/)
- GitHub: [@paldentitung](https://github.com/paldentitung)

---

## 📄 License

MIT
