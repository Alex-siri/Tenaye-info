const form = document.getElementById("search-form");
const resultsDiv = document.getElementById("results");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("search-input").value.trim();
  if (!name) return;
  resultsDiv.innerHTML = '<p class="text-gray-500">Searching...</p>';
  try {
    const data = await searchMedicine(name);
    resultsDiv.innerHTML = "";
    if (data.count === 0) {
      resultsDiv.innerHTML = '<p class="text-gray-500">No medicines found.</p>';
      return;
    }
    data.medicines.forEach((med) => {
      resultsDiv.appendChild(renderMedicineCard(med));
    });
  } catch (error) {
    const p = document.createElement("p");
    p.className = "text-red-600";
    p.textContent = error.message;
    resultsDiv.replaceChildren(p);
  }
});
