# 💊 Tenaye Info – Safe Medicine Knowledge for Every Ethiopian

Dawa Info is an AI-powered web application that helps users safely identify medicines and understand their purpose, side effects, warnings, and usage instructions in **Amharic, Afaan Oromo, and English**. By simply uploading a photo of a medicine package or searching by name, users receive clear, localized medicine information to support safer healthcare decisions.

---

## 📖 Overview

Millions of people purchase medicines without professional guidance and often lack access to understandable safety information. Dawa Info bridges this gap by using Artificial Intelligence, Optical Character Recognition (OCR), and trusted drug databases to provide medicine safety information in local languages. :contentReference[oaicite:1]{index=1}

---

## ❗ Problem Statement

Many medicines are purchased without prescriptions or proper medical advice. As a result, people may misuse medications because they do not understand:

- The purpose of the medicine
- Proper dosage
- Possible side effects
- Drug interactions
- When to stop using the medicine

Language barriers further limit access to reliable medicine information for many Ethiopian users. :contentReference[oaicite:2]{index=2}

---

## 💡 Our Solution

Dawa Info allows users to:

- 📷 Upload a photo of a medicine package
- 🔍 Search medicines by name
- 🤖 Identify medicines using AI-powered OCR
- 🌍 Read medicine information in:
  - English
  - Amharic
  - Afaan Oromo

The platform delivers clear explanations about each medicine, helping users make safer and more informed decisions. :contentReference[oaicite:3]{index=3}

---

## ✨ Core Features

- 📸 Drug Photo Upload
- 🔤 Drug Name Search
- 🤖 AI-based Medicine Identification
- ⚠️ Side Effects & Safety Warnings
- 💊 Medicine Purpose & Usage
- 🔄 Drug Interaction Information
- 🌐 Multilingual Support
- 📱 Responsive Web Interface

---

## ⚙️ How It Works

1. User uploads a medicine photo or enters its name.
2. OCR extracts text from the medicine package.
3. The medicine is matched against the OpenFDA database.
4. AI retrieves medicine information.
5. Information is translated into the user's selected language.
6. The user receives a complete medicine safety profile.

---

## 🛠️ Technology Stack

### Frontend

- React

### Backend

- Python
- FastAPI

### AI & OCR

- Google Vision API *(or Tesseract OCR)*

### Drug Database

- OpenFDA API

### Translation

- Google Translate API

---

## 🌍 Supported Languages

- 🇪🇹 Amharic
- 🇪🇹 Afaan Oromo
- 🇬🇧 English

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/dawa-info.git
cd dawa-info
```

### Create a virtual environment

```bash
python -m venv venv
```

### Activate the environment

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```cmd
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Start the backend

```bash
uvicorn main:app --reload
```

### Start the frontend

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
dawa-info/
│
├── backend/
│   ├── app/
│   ├── api/
│   ├── services/
│   ├── models/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── components/
│
├── README.md
├── requirements.txt
└── package.json
```

---

## 🎯 Future Improvements

- Offline support for low-bandwidth areas
- Barcode scanning
- Voice assistance in local languages
- Medicine reminder system
- Nearby pharmacy locator
- Personalized medicine history
- AI-powered medicine recommendations

---

## ⚠️ Disclaimer

Dawa Info is designed to provide educational medicine information only. It is **not a substitute for professional medical advice**. Users should always consult a qualified healthcare provider or pharmacist before taking or changing any medication.

---

## 🌍 Vision

Our vision is to make safe medicine knowledge accessible to every Ethiopian by providing reliable, understandable, and localized medicine information through AI-powered technology.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project was developed for educational and hackathon purposes.

---

## 👨‍💻 Authors

Developed by the **Dawa Info Team**

Safe Medicine Knowledge for Every Ethiopian.