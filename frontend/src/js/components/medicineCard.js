function renderMedicineCard(medicine) {
  const card = document.createElement("div");
  card.className = "bg-white border rounded-lg p-4 mb-3 shadow-sm";
  card.innerHTML = `
 <h3 class="font-semibold text-lg">${medicine.name.en}${medicine.name.am ? " / " + medicine.name.am : ""}</h3>
 <p class="text-sm text-gray-600 mt-1"><b>Purpose:</b> ${medicine.purpose?.en || "N/A"}</p>
 <p class="text-sm text-gray-600"><b>Dosage:</b> ${medicine.dosage?.en || "N/A"}</p>
 <p class="text-sm text-red-600 mt-1"><b>Warnings:</b> ${medicine.warnings?.en || "N/A"}</p>
 `;
  return card;
}
