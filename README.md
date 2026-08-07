# 💊 Tenaye Info – Safe Medicine Knowledge for Every Ethiopian

Tenaye Info is an AI-powered web application that helps users safely identify medicines and understand their purpose, side effects, warnings, dosage, and usage instructions in **Amharic, Afaan Oromo, and English**.

Users can upload a medicine package image or search by medicine name to instantly receive localized and easy-to-understand medicine information. In addition, Tenaye Info offers personalized user profiles, pharmacy location services, and an AI chatbot to make healthcare information more accessible across Ethiopia.

---

# 📖 Overview

Millions of Ethiopians purchase medicines without professional guidance and often lack access to reliable information in their native language. Tenaye Info bridges this gap by combining Artificial Intelligence, OCR technology, trusted medicine databases, and location-based services to provide understandable medicine information and healthcare assistance.

---

# ❗ Problem Statement

Many medicines are purchased without prescriptions or proper medical advice. As a result, people may misuse medications because they do not understand:

- What the medicine is used for
- Proper dosage
- Side effects
- Drug interactions
- Safety warnings
- When to stop taking the medicine

Language barriers and limited access to healthcare information make the situation even worse for many Ethiopian communities.

---

# 💡 Our Solution

Tenaye Info allows users to:

- 📷 Upload a medicine photo
- 🔍 Search medicines by name
- 🤖 Identify medicines using AI-powered OCR
- 👤 Create and manage personal user profiles
- 📍 Find nearby pharmacies using location services
- 💬 Chat with an AI assistant for medicine-related guidance
- 🌍 Read medicine information in:
  - English
  - Amharic
  - Afaan Oromo

The platform delivers clear and localized explanations to help users make safer healthcare decisions.

---

# ✨ Core Features

- 📸 Medicine Photo Upload
- 🔤 Medicine Name Search
- 🤖 AI-based Medicine Identification
- 💊 Medicine Purpose & Usage
- ⚠️ Side Effects & Safety Warnings
- 🔄 Drug Interaction Information
- 🌐 Multilingual Support
- 👤 User Profile Management
- 🏠 Store Personal Information (Name, Age, Gender, Address, etc.)
- 📍 Nearby Pharmacy Finder
- 💬 AI Health Chatbot
- 📱 Fully Responsive Web Application

---

# 👤 User Profile

Every registered user has a personalized profile where they can securely manage their personal information, including:

- Full Name
- Gender
- Age
- Phone Number
- Email Address
- Region
- City
- Home Address
- Profile Picture

The profile also allows users to save their preferences and improve their overall experience.

---

# 📍 Pharmacy Locator

Using the device's location (with user permission), Tenaye Info helps users locate nearby pharmacies.

Features include:

- Find nearby pharmacies
- View pharmacy locations on a map
- Get directions
- View contact information (where available)

---

# 💬 AI Chatbot

Tenaye Info includes an AI-powered chatbot that helps users by:

- Answering medicine-related questions
- Explaining medicine usage
- Providing safety reminders
- Helping users navigate the application
- Offering general health education

> The chatbot provides educational information only and does not replace professional medical advice.

---

# ⚙️ How It Works

1. User uploads a medicine image or enters its name.
2. OCR extracts text from the medicine package.
3. The medicine is matched with trusted medicine databases.
4. AI retrieves medicine information.
5. Information is translated into the selected language.
6. Users can ask additional questions through the chatbot.
7. Users can locate nearby pharmacies if professional assistance is needed.

---

# 🛠️ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Tailwind CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB

## AI & OCR

- Google Vision API *(or Tesseract OCR)*

## Drug Database

- OpenFDA API

## Maps & Location

- Geolocation API
- Google Maps API *(or OpenStreetMap)*

## Translation

- Google Translate API

---

# 🌍 Supported Languages

- 🇪🇹 Amharic
- 🇪🇹 Afaan Oromo
- 🇬🇧 English

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/tenaye-info.git

cd tenaye-info
```

## Install Backend Dependencies

```bash
cd backend
npm install
```

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

OPENFDA_API_KEY=your_api_key

GOOGLE_MAPS_API_KEY=your_api_key

GOOGLE_VISION_API_KEY=your_api_key

GOOGLE_TRANSLATE_API_KEY=your_api_key
```

## Start Backend

```bash
npm run dev
```

## Start Frontend

```bash
npm run dev
```

---

# 📁 Project Structure

```
tenaye-info/

├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.js
│   └── package.json
│
├── README.md
├── .env.example
└── package.json
```

---

# 🎯 Future Improvements

- Offline support for low-bandwidth communities
- Barcode scanning
- Voice assistance in local languages
- Medicine reminder system
- Digital prescription storage
- Emergency health information
- Hospital and clinic locator
- Pharmacy ratings and reviews
- Medicine availability checker
- AI-powered health recommendations
- Medicine history and favorites

---

# ⚠️ Disclaimer

Tenaye Info provides educational medicine information only.

It is **not a substitute for professional medical advice, diagnosis, or treatment.**

Always consult a qualified healthcare provider or pharmacist before taking, stopping, or changing any medication.

---

# 🌍 Vision

Our vision is to make safe medicine knowledge accessible to every Ethiopian through AI-powered technology, multilingual support, personalized healthcare services, and easy access to nearby pharmacies.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project was developed for educational, research, and hackathon purposes.

---

# 👨‍💻 Authors

Developed by the **Tenaye Info Team**

**Safe Medicine Knowledge for Every Ethiopian**