function renderMedicineCard(medicine) {
  const escapeHtml = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const nameEn = escapeHtml(medicine?.name?.en || "N/A");
  const nameAm = medicine?.name?.am ? " / " + escapeHtml(medicine.name.am) : "";

  const card = document.createElement("div");
  card.className = "bg-white border rounded-lg p-4 mb-3 shadow-sm";
  card.innerHTML = `
 <h3 class="font-semibold text-lg">${nameEn}${nameAm}</h3>
 <p class="text-sm text-gray-600 mt-1"><b>Purpose:</b> ${escapeHtml(medicine?.purpose?.en || "N/A")}</p>
 <p class="text-sm text-gray-600"><b>Dosage:</b> ${escapeHtml(medicine?.dosage?.en || "N/A")}</p>
 <p class="text-sm text-red-600 mt-1"><b>Warnings:</b> ${escapeHtml(medicine?.warnings?.en || "N/A")}</p>
 `;
  return card;
}
