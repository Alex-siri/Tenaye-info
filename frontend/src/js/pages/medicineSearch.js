const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageInput = document.getElementById("image-input");
const dropZone = document.getElementById("drop-zone");
const resultsDiv = document.getElementById("results");
const suggestionBtns = document.querySelectorAll(".suggestion-btn");

// Store dynamic error data to translate on language change
let currentDynamicError = null;

// Handle text search
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = searchInput.value.trim();
    if (!name) return;
    
    currentDynamicError = null; // Clear any previous error

    resultsDiv.innerHTML = '<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800 font-medium animate-pulse" data-i18n="search.searching">Searching database...</p></div>';
    if (typeof applyTranslations === 'function') applyTranslations();
    
    // Automatically scroll to the loading state
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
        const data = await searchMedicine(name);
        resultsDiv.innerHTML = "";

        if (data.count === 0) {
            resultsDiv.innerHTML = '<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800" data-i18n="search.noResults">No medicines found.</p></div>';
            if (typeof applyTranslations === 'function') applyTranslations();
            return;
        }

        data.medicines.forEach((med) => {
            resultsDiv.appendChild(renderMedicineCard(med));
        });
        
        // Scroll to the top of the results once they load
        setTimeout(() => {
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
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
    
    currentDynamicError = null; // Clear any previous error

    // File size limit: 10MB
    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
        showError("File size must be less than 10MB. Please choose a smaller image.");
        // Reset file inputs
        cameraInput.value = "";
        galleryInput.value = "";
        return;
    }

    const imgUrl = URL.createObjectURL(file);
    
    // Replace the drop zone content with the uploaded image
    dropZone.innerHTML = `
        <div class="border-2 border-dashed border-gold-400 rounded-xl p-2 text-center bg-navy-50 transition-all group relative overflow-hidden h-64 flex items-center justify-center">
            <img src="${imgUrl}" class="max-h-full max-w-full mx-auto rounded-lg object-contain" />
            <div class="absolute inset-0 bg-navy-900/60 hidden group-hover:flex items-center justify-center backdrop-blur-sm rounded-lg transition-all">
                <p class="text-white font-bold flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Tap to change photo
                </p>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = `
      <div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm mb-6">
        <p class="text-navy-800 font-medium animate-pulse flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-gold-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span data-i18n="search.searching">Searching drug database…</span>
        </p>
      </div>`;
    if (typeof applyTranslations === 'function') applyTranslations();
      
    // Automatically scroll to the loading state
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
        const data = await identifyMedicineFromImage(file);
        resultsDiv.innerHTML = "";

        if (!data.drug) {
            resultsDiv.innerHTML = `<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800"><span data-i18n="search.noMatchDetected">No match found. Detected text:</span> "${data.ocr?.raw_text || "none"}"</p></div>`;
            if (typeof applyTranslations === 'function') applyTranslations();
            return;
        }

        const infoText = document.createElement("p");
        infoText.className = "text-gold-600 mb-4 font-semibold text-sm text-center bg-gold-50 p-3 rounded-lg border border-gold-200";
        infoText.innerHTML = `✅ <span data-i18n="search.detectedOcr">Detected via AI OCR:</span> "${data.ocr.detected_name}"`;
        resultsDiv.appendChild(infoText);

        resultsDiv.appendChild(renderMedicineCard(data.drug));
        if (typeof applyTranslations === 'function') applyTranslations();
        
        // Scroll to results
        setTimeout(() => {
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            showError("Network Error: Could not connect to the server. The image might be too large or the AI service is busy.");
        } else if (error.message.includes('not found in the database')) {
            const match = error.message.match(/Drug '(.*)' was read/);
            const drugName = match ? match[1] : '';
            
            const escapedDrugName = drugName.replace(/"/g, '&quot;');
            
            resultsDiv.innerHTML = `<div class="text-center p-8 bg-gold-50 rounded-xl border border-gold-200 shadow-sm"><p class="text-gold-700 font-medium" data-i18n="search.notFoundDatabase" data-i18n-options='{"drug":"${escapedDrugName}"}'>⚠️ ${error.message}</p></div>`;
            
            if (typeof applyTranslations === 'function') applyTranslations();
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

// Logic removed
