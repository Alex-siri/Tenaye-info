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
    if (!data.matches || data.matches.length === 0) {
      const p = document.createElement("p");
      p.className = "text-gray-500";
      p.textContent = `No match found. Detected text: "${data.extractedText || "none"}"`;
      resultsDiv.replaceChildren(p);
      return;
    }
    data.matches.forEach((med) => {
      resultsDiv.appendChild(renderMedicineCard(med));
    });
  } catch (error) {
    const p = document.createElement("p");
    p.className = "text-red-600";
    p.textContent = error.message;
    resultsDiv.replaceChildren(p);
  }
});
