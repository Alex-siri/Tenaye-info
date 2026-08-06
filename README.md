# Local Services & Skilled Workers Marketplace (Offline-First)

A web-based marketplace that connects customers with verified local skilled workers such as plumbers, electricians, tutors, carpenters, mechanics, and other service providers. The platform is designed with an **Offline-First** architecture to ensure users can continue accessing essential features even in areas with limited or unstable internet connectivity.

---

## 📖 Overview

Finding reliable local service providers can be difficult, especially in regions where digital platforms are limited and internet connectivity is unreliable. This project aims to bridge that gap by providing a trusted platform where customers can discover skilled workers, request services, and leave reviews, while enabling service providers to showcase their skills and receive job requests.

The system is built as an **Offline-First Progressive Web Application (PWA)**, allowing users to browse previously loaded data and submit requests offline, with automatic synchronization once an internet connection becomes available.

---

## 🎯 Objectives

- Connect customers with trusted local skilled workers.
- Increase digital visibility for local professionals.
- Improve trust through ratings and reviews.
- Support low-connectivity environments using Offline-First architecture.
- Provide a simple, mobile-friendly user experience.

---

## ✨ Features

### Customer

- User Registration & Login
- Browse available services
- Search providers by category
- View provider profiles
- Submit booking requests
- Rate and review completed services

### Service Provider

- Register as a provider
- Create and manage professional profile
- Add offered services
- Manage booking requests
- Update service information

### Administrator

- Manage users
- Verify service providers
- Manage service categories
- Monitor platform activity

---

## 🌐 Offline-First Functionality

The application is designed to continue functioning even when the internet connection is unavailable.

Offline capabilities include:

- Cached application assets
- Offline browsing of previously viewed providers
- Cached service categories
- Offline booking request queue
- Automatic synchronization when internet connectivity returns

---

## 🏗️ System Architecture

```
                User
                  │
                  ▼
      Progressive Web App (PWA)
                  │
      ┌───────────┴───────────┐
      │                       │
Service Worker           IndexedDB
      │                       │
      └───────────┬───────────┘
                  │
          Django REST API
                  │
            PostgreSQL
```

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Progressive Web App (PWA)

### Backend

- Python 3.12
- Django
- Django REST Framework

### Database

- PostgreSQL

### Offline Technologies

- Service Workers
- IndexedDB
- Cache API

### Version Control

- Git
- GitHub

---

## 📂 Project Structure

```
local_services_marketplace/
│
├── core/
├── users/
├── services/
├── bookings/
├── reviews/
│
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
└── venv/
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/local_services_marketplace.git
cd local_services_marketplace
```

### 2. Create a virtual environment

```bash
python3.12 -m venv venv
```

### 3. Activate the virtual environment

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```cmd
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure PostgreSQL

Update your database credentials inside:

```
core/settings.py
```

### 6. Apply migrations

```bash
python manage.py migrate
```

### 7. Create an administrator

```bash
python manage.py createsuperuser
```

### 8. Start the development server

```bash
python manage.py runserver
```

Visit:

```
http://127.0.0.1:8000
```

---

## 📌 Development Roadmap

### Phase 1

- Project setup
- Authentication
- Database design

### Phase 2

- User management
- Service management
- Provider profiles

### Phase 3

- Booking system
- Ratings & Reviews

### Phase 4

- Offline-first implementation
- Service Worker
- IndexedDB
- Background synchronization

### Phase 5

- Testing
- Deployment
- Documentation

---

## 🎯 Future Improvements

- In-app messaging
- Online payments
- GPS location services
- Push notifications
- AI-powered service recommendations
- Mobile application

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is developed for educational purposes at **Mekelle Institute of Technology (MIT)**.

---

## 👨‍💻 Author

**Alex (Alula Muzey)**

IT Student | Full-Stack Developer

GitHub: https://github.com/Alex-siri

---