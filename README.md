# 🚀 URL Shortener (Full Stack + Dockerized)

A scalable and production-ready URL shortener built using modern web technologies. This project demonstrates backend architecture, caching, containerization, and full-stack integration.
---

## 📌 Features

- 🔗 Shorten long URLs into compact links
- ⚡ Fast redirection using caching (Redis)
- 🗄️ Persistent storage with MongoDB
- 📊 Unique short code generation
- 🐳 Fully containerized using Docker & Docker Compose

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Nginx (for serving production build)

### Backend
- Node.js
- Express.js
- Mongoose

### Database & Cache
- MongoDB (persistent storage)
- Redis (caching layer)

### DevOps / Tools
- Docker
- Docker Compose

---

## 🏗️ Architecture

```
User → Frontend (React + Nginx)
            ↓
        Backend (Node.js)
        ↙            ↘
   Redis (Cache)   MongoDB (DB)
```

### Flow:
1. User submits a long URL  
2. Backend generates a short code  
3. Data stored in MongoDB  
4. Frequently accessed URLs cached in Redis  
5. Redirect happens via backend  

---



## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Docker installed
- Docker Compose installed

---

### ▶️ Run the Project

```bash
docker compose up --build
```

---

### 🌐 Access the docker images

- Backend API: https://hub.docker.com/repository/docker/manankapkar/urlshortner-backend
- Frontend: https://hub.docker.com/repository/docker/manankapkar/urlshortner-frontend

---

## 🐳 Docker Services

| Service   | Description              | Port  |
|----------|--------------------------|------|
| frontend | React app via Nginx      | 3000 |
| backend  | Node.js API              | 5000 |
| mongodb  | Database                 | 27017 |
| redis    | Cache                    | 6379 |

---

## 📦 Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/urlshortener
REDIS_HOST=redis
REDIS_PORT=6379
BASE_URL=http://localhost:5000
```


## 💾 Data Persistence

- MongoDB uses Docker volume for persistent storage  
- Data remains intact even after container restarts  

---

## ⚡ Performance Optimization

- Implemented Redis caching to reduce MongoDB queries  
- Improved response time for repeated URL access  

---
## 🧠 What I Learned

- Designing scalable backend systems  
- Using Redis for performance optimization  
- Dockerizing multi-service applications  
- Managing persistent volumes  

---

## 🤝 Contributing

Feel free to fork this repo and improve it!

---


