const form = document.getElementById("upload-form");
const resultsDiv = document.getElementById("results");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("image-input");
  const file = fileInput.files[0];
  if (!file) return;
  resultsDiv.innerHTML = '<p class="text-gray-500">Reading image...</p>';
  try {
    const data = await identifyMedicineFromImage(file);
    resultsDiv.innerHTML = "";
    if (!data.drug) {
      const p = document.createElement("p");
      p.className = "text-gray-500";
      p.textContent = `No match found. Detected text: "${data.ocr?.raw_text || "none"}"`;
      resultsDiv.replaceChildren(p);
      return;
    }
    
    const infoText = document.createElement("p");
    infoText.className = "text-green-600 mb-4 font-semibold text-sm";
    infoText.textContent = `Detected via OCR: "${data.ocr.detected_name}"`;
    resultsDiv.appendChild(infoText);

    resultsDiv.appendChild(renderMedicineCard(data.drug));
  } catch (error) {
    const p = document.createElement("p");
    p.className = "text-red-600";
    p.textContent = error.message;
    resultsDiv.replaceChildren(p);
  }
});
