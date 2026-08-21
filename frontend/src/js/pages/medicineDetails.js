document.addEventListener('DOMContentLoaded', () => {
    const resultsDiv = document.getElementById("results");
    
    try {
        const resultString = sessionStorage.getItem('medicineSearchResult');
        if (!resultString) {
            resultsDiv.innerHTML = '<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800">No search results found. Please try searching again.</p></div>';
            return;
        }

        const data = JSON.parse(resultString);
        resultsDiv.innerHTML = "";

        if (data.type === 'text') {
            if (!data.data || data.data.count === 0) {
                resultsDiv.innerHTML = '<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800">No medicines found for your search.</p></div>';
                return;
            }
            data.data.medicines.forEach((med) => {
                resultsDiv.appendChild(renderMedicineCard(med));
            });
        } else if (data.type === 'image') {
            if (!data.data || !data.data.drug) {
                resultsDiv.innerHTML = `<div class="text-center p-8 bg-white rounded-xl border border-navy-100 shadow-sm"><p class="text-navy-800">No match found. Detected text: "${data.data?.ocr?.raw_text || "none"}"</p></div>`;
                return;
            }

            const infoText = document.createElement("p");
            infoText.className = "text-gold-600 mb-4 font-semibold text-sm text-center bg-gold-50 p-3 rounded-lg border border-gold-200";
            infoText.textContent = `✅ Detected via AI OCR: "${data.data.ocr.detected_name}"`;
            resultsDiv.appendChild(infoText);

            resultsDiv.appendChild(renderMedicineCard(data.data.drug));
        }

    } catch (error) {
        resultsDiv.innerHTML = `<div class="text-center p-8 bg-red-50 rounded-xl border border-red-100 shadow-sm"><p class="text-red-600 font-medium">Error loading results. Please try again.</p></div>`;
    }
});
