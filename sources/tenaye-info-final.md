# Tenaye Info — Structure, File Glossary, Connection Flow & 7-Day Plan

This matches your latest README: English + Amharic only, Gemini for the chatbot, chatbot gated behind login, registration optional for other features, and the backend serving the frontend directly (no separate frontend dev server).

---

## Folder Structure

```
tenaye-info/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── cloudinary.js
│   │   │   ├── googleVision.js
│   │   │   └── gemini.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Medicine.js
│   │   │   ├── ChatHistory.js
│   │   │   └── Pharmacy.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── medicineController.js
│   │   │   ├── ocrController.js
│   │   │   ├── chatbotController.js
│   │   │   └── pharmacyController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── medicineRoutes.js
│   │   │   ├── ocrRoutes.js
│   │   │   ├── chatbotRoutes.js
│   │   │   └── pharmacyRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── ocrService.js
│   │   │   ├── translationService.js
│   │   │   ├── drugLookupService.js
│   │   │   ├── chatbotService.js
│   │   │   └── pharmacyService.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── validateRequest.js
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── apiResponse.js
│   │   │   └── constants.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   ├── locales/
│   │   │   ├── en/translation.json
│   │   │   └── am/translation.json
│   │   └── assets/
│   │       ├── images/
│   │       └── icons/
│   │
│   ├── pages/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── profile.html
│   │   ├── medicine-search.html
│   │   ├── medicine-details.html
│   │   ├── chatbot.html
│   │   ├── pharmacy-locator.html
│   │   └── 404.html
│   │
│   ├── src/
│   │   ├── css/
│   │   │   ├── input.css
│   │   │   └── output.css
│   │   │
│   │   ├── js/
│   │   │   ├── components/
│   │   │   │   ├── navbar.js
│   │   │   │   ├── footer.js
│   │   │   │   ├── languageSwitcher.js
│   │   │   │   ├── medicineCard.js
│   │   │   │   ├── chatBubble.js
│   │   │   │   └── pharmacyListItem.js
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── home.js
│   │   │   │   ├── login.js
│   │   │   │   ├── register.js
│   │   │   │   ├── profile.js
│   │   │   │   ├── medicineSearch.js
│   │   │   │   ├── medicineDetails.js
│   │   │   │   ├── chatbot.js
│   │   │   │   └── pharmacyLocator.js
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── api.js
│   │   │   │   ├── authService.js
│   │   │   │   ├── medicineService.js
│   │   │   │   ├── chatbotService.js
│   │   │   │   └── pharmacyService.js
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   ├── auth.js
│   │   │   │   ├── geolocation.js
│   │   │   │   ├── domHelpers.js
│   │   │   │   └── validators.js
│   │   │   │
│   │   │   ├── i18n.js
│   │   │   └── main.js
│   │
│   ├── package.json          # only needed for the tailwindcss dev dependency + build script
│   ├── tailwind.config.js
│   ├── .gitignore
│   └── README.md
│
├── docs/
├── .gitignore
└── README.md                 # your full README content goes here
```

**One simplification from your README worth noting explicitly:** since the backend serves `frontend/` as static files (`npm run dev` starts everything from `backend/`), you don't need Vite or a separate frontend dev server at all. Tailwind just needs to be compiled once (or with `--watch` while you work) using the Tailwind CLI — `npx tailwindcss -i src/css/input.css -o src/css/output.css --watch`. That's the only thing `frontend/package.json` is for.

---

## How Everything Connects — Request Flow Walkthrough

This is the part that matters most for understanding the system, not just memorizing file names. Here's what actually happens for two real user actions:

### Flow 1: User logs in

1. User opens `login.html` in the browser → it loads `js/pages/login.js`.
2. User submits the form → `login.js` reads the email/password from the DOM, calls `authService.login(email, password)`.
3. `authService.js` calls `api.js`, which does a `fetch()` to `POST http://localhost:5000/api/auth/login` with the email/password as JSON body.
4. On the **backend**, this request hits `app.js` first (it's always the entry point for every request), which has already mounted `authRoutes.js` at `/api/auth`.
5. `authRoutes.js` matches `POST /login` and calls `authController.login`.
6. `authController.js` looks up the user in MongoDB using the `User` model, checks the password with bcrypt, and if valid, creates a JWT and sends it back as JSON: `{ token: "...", user: {...} }`.
7. Back in the **frontend**, `authService.js` receives that response and returns it to `login.js`.
8. `login.js` calls `utils/auth.js` to save the token in `localStorage`, then redirects the browser to `profile.html` (or wherever).
9. On every future page load, `main.js` calls `utils/auth.js` to check if a valid token exists, and updates the navbar (e.g. showing "Profile" instead of "Login").

### Flow 2: User searches for a medicine

1. User is on `medicine-search.html`, types a name, hits search → `js/pages/medicineSearch.js` reads the input, calls `medicineService.searchMedicine(name)`.
2. `medicineService.js` → `api.js` → `fetch()` to `GET /api/medicines/search?name=...`.
3. Backend: `app.js` → `medicineRoutes.js` → `medicineController.searchMedicine`.
4. `medicineController.js` doesn't talk to the database directly — it calls `drugLookupService.js`, which contains the actual logic: check your own MongoDB `Medicine` collection first, and only fall back to an external reference source if nothing is found.
5. The result travels back: `drugLookupService` → `medicineController` → JSON response → `medicineService.js` on the frontend.
6. `medicineSearch.js` takes that data and calls `js/components/medicineCard.js` once per result to build the HTML, and inserts it into the page.

**The pattern to internalize:** frontend `pages/*.js` files never talk to the database or external APIs directly — they always go through a `service`. Same on the backend: `controllers` never contain the heavy logic directly — they call a `service`, which is where the real work (DB queries, external API calls) happens. This separation is what makes each file easy to understand and test on its own, which matters a lot for you learning file-by-file.

### Flow 3 (for later): OCR photo upload
`medicine-details.html` upload form → `js/pages/medicineDetails.js` → sends the image file via `fetch` (as `FormData`, not JSON) → backend `ocrController.js` → `ocrService.js` sends it to Google Vision → gets text back → `ocrController.js` passes that text to `drugLookupService.js` (same service Flow 2 uses) → returns matched medicine data → frontend renders it the same way as a normal search result.

### Flow 4 (for later): Chatbot (Gemini)
`chatbot.html` (only reachable if `utils/auth.js` confirms the user is logged in — otherwise redirect to register) → `js/pages/chatbot.js` → `chatbotService.js` → backend `chatbotController.js` → `services/gemini.js`-configured client sends the user's question (plus relevant medicine info pulled via `drugLookupService.js`) to the Gemini API → the reply is saved to `ChatHistory` and returned to the frontend → `chatBubble.js` renders it.

---

## One-Week Plan (Realistic Scope)

Being honest: building all of this — auth, medicine DB, OCR, chatbot, pharmacy locator, two languages, profiles — fully polished in one week is very tight, especially while learning file-by-file. Here's a plan that gets you a genuinely working app in 7 days by sequencing ruthlessly and treating OCR + pharmacy locator as the parts to simplify first if you run short on time.

**Day 1 — Backend foundation**
`config/db.js` → `models/User.js` → `models/Medicine.js` → `app.js` + `server.js`. Goal by end of day: server starts, connects to MongoDB Atlas, no routes yet. Manually insert 5–10 test medicines into MongoDB (English + Amharic fields) so you have real data to work with all week.

**Day 2 — Auth, full loop**
`authController.js` + `authRoutes.js` + `authMiddleware.js` on backend. On frontend: `pages/login.html`, `register.html`, `js/pages/login.js`, `register.js`, `utils/auth.js`, `services/api.js`, `authService.js`. Goal: register a user, log in, token stored, protected route rejects without it. This is your biggest single milestone — the full-stack loop working.

**Day 3 — Medicine search (core feature)**
`medicineController.js` + `medicineRoutes.js` + `drugLookupService.js` on backend (querying your own DB only — skip external APIs for now). Frontend: `medicine-search.html`, `medicineSearch.js`, `medicineCard.js`, `medicineService.js`. Goal: search box returns real results from MongoDB, in the selected language.

**Day 4 — Profile + language switching**
`userController.js` + `userRoutes.js`. Frontend: `profile.html`, `profile.js`, `languageSwitcher.js`, `i18n.js`, both locale JSON files. Goal: user can view/edit profile, and switch the UI language.

**Day 5 — Chatbot (Gemini), simplified**
`config/gemini.js` + `chatbotController.js` + `chatbotService.js` + `chatbotRoutes.js`. Frontend: `chatbot.html` (gated to logged-in users), `chatbot.js`, `chatBubble.js`. For day 5, keep the prompt simple — pass the user's question plus a few relevant medicines from your DB as context, rather than building a full retrieval system. You can improve the grounding logic after the week if there's time.

**Day 6 — OCR (simplify aggressively if behind schedule)**
`config/googleVision.js` + `config/cloudinary.js` + `ocrService.js` + `ocrController.js` + `ocrRoutes.js`. Frontend: upload form on `medicine-details.html`. **If you're behind on Day 6**, it's fine to ship the search feature only this week and add OCR right after — OCR (image upload, preprocessing, matching extracted text to your DB) is genuinely the most failure-prone part to debug under time pressure.

**Day 7 — Pharmacy locator + polish + deploy prep**
`pharmacyService.js` + `pharmacyController.js` + `pharmacy-locator.html`. If Google Maps API setup is slowing you down, OpenStreetMap + Leaflet is faster to get working with no API key needed. Spend remaining time on: error handling (so the app doesn't break silently), the disclaimer text from your README, and testing the full flow end to end (register → search → chatbot → logout).

**If you have to cut something to hit 7 days**, cut in this order: pharmacy locator first (it's the most independent/skippable feature), then OCR (medicine search by name still covers the core value), keeping auth + search + chatbot as your non-negotiable MVP — that's the heart of "safely identify medicines and understand them," which is your actual problem statement.
