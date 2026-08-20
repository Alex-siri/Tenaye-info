const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageInput = document.getElementById("image-input");
const dropZone = document.getElementById("drop-zone");
const resultsDiv = document.getElementById("results");
const suggestionBtns = document.querySelectorAll(".suggestion-btn");

// Handle text search
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = searchInput.value.trim();
    if (!name) return;

    resultsDiv.innerHTML = '<div class="text-center p-8"><p class="text-navy-800 font-medium">Searching database...</p></div>';

    try {
        const data = await searchMedicine(name);
        resultsDiv.innerHTML = "";

        if (data.count === 0) {
            resultsDiv.innerHTML = '<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800">No medicines found.</p></div>';
            return;
        }

        data.medicines.forEach((med) => {
            resultsDiv.appendChild(renderMedicineCard(med));
        });
    } catch (error) {
        showError(error.message);
    }
});

// Handle suggestion pills
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = btn.textContent;
        searchForm.dispatchEvent(new Event('submit'));
    });
});

const cameraInput = document.getElementById("camera-input");
const galleryInput = document.getElementById("gallery-input");
const browseBtn = document.getElementById("browse-files-btn");

// Trigger camera when clicking anywhere in the drop zone (except the browse button)
dropZone.addEventListener('click', (e) => {
    // If they didn't click the label itself, open camera
    if (e.target !== browseBtn) {
        cameraInput.click();
    }
});

// Handle file upload for both inputs
cameraInput.addEventListener("change", handleFileUpload);
galleryInput.addEventListener("change", handleFileUpload);

async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    resultsDiv.innerHTML = `
      <div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm mb-6">
        <img src="${imgUrl}" class="max-h-64 mx-auto rounded-lg shadow-sm mb-4 object-contain border border-slate-100" />
        <p class="text-navy-800 font-medium animate-pulse flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-gold-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Searching drug database…
        </p>
      </div>`;

    try {
        const data = await identifyMedicineFromImage(file);
        resultsDiv.innerHTML = "";

        if (!data.drug) {
            resultsDiv.innerHTML = `<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800">No match found. Detected text: "${data.ocr?.raw_text || "none"}"</p></div>`;
            return;
        }

        const infoText = document.createElement("p");
        infoText.className = "text-gold-600 mb-4 font-semibold text-sm text-center";
        infoText.textContent = `✅ Detected via AI OCR: "${data.ocr.detected_name}"`;
        resultsDiv.appendChild(infoText);

        resultsDiv.appendChild(renderMedicineCard(data.drug));
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            showError("Network Error: Could not connect to the server. The image might be too large or the AI service is busy.");
        } else if (error.message.includes('not found in the database')) {
            resultsDiv.innerHTML = `<div class="text-center p-8 bg-gold-50 rounded-xl border border-gold-200 shadow-sm"><p class="text-gold-700 font-medium">⚠️ ${error.message}</p></div>`;
        } else {
            showError(error.message);
        }
    }

    // Reset file inputs so same file can be uploaded again if needed
    cameraInput.value = "";
    galleryInput.value = "";
}

// Drag and drop styles for the upload box
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
        dropZone.firstElementChild.classList.add('border-gold-400', 'bg-navy-50');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
        dropZone.firstElementChild.classList.remove('border-gold-400', 'bg-navy-50');
    }, false);
});

dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    galleryInput.files = files;
    handleFileUpload({ target: galleryInput });
});

function showError(message) {
    resultsDiv.innerHTML = `<div class="text-center p-8 bg-red-50 rounded-xl border border-red-100 shadow-sm"><p class="text-red-600 font-medium">${message}</p></div>`;
}

// Handle Hero Language Pill Buttons
const langPills = document.querySelectorAll('.lang-pill');
if (langPills.length > 0) {
    const updatePills = () => {
        const currentDataLang = document.body.getAttribute('data-lang') || localStorage.getItem('language') || 'en';
        langPills.forEach(pill => {
            if (pill.dataset.lang === currentDataLang) {
                // Active state (Gold)
                pill.className = "lang-pill px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm bg-gold-500 text-navy-950 border-transparent";
            } else {
                // Inactive state (White with border)
                pill.className = "lang-pill px-6 py-2 rounded-full text-sm font-semibold transition-colors border shadow-sm bg-white text-gray-700 hover:bg-gray-50 border-gray-200";
            }
        });
    };

    // Initial update on load
    setTimeout(updatePills, 100);

    langPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // ONLY change the data-lang attribute to toggle medicine details, 
            // DO NOT call changeLanguage() which would change the entire UI.
            document.body.setAttribute('data-lang', pill.dataset.lang);
            updatePills();
        });
    });

    // Keep pills in sync if the user uses the navbar dropdown instead
    if (typeof i18next !== 'undefined') {
        i18next.on('languageChanged', () => {
            // i18n.js automatically updates the data-lang on the body, so we just need to update the pills visually
            updatePills();
        });
    }
}
