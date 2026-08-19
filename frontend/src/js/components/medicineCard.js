function renderMedicineCard(medicine) {
  const escapeHtml = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const nameEn = escapeHtml(medicine?.name?.en || "Information not provided");
  const nameAm = escapeHtml(medicine?.name?.am || medicine?.name?.en || "መረጃ አልቀረበም");

  const purposeEn = escapeHtml(medicine?.purpose?.en || "Information not provided");
  const purposeAm = escapeHtml(medicine?.purpose?.am || medicine?.purpose?.en || "መረጃ አልቀረበም");

  const dosageEn = escapeHtml(medicine?.dosage?.en || "Information not provided");
  const dosageAm = escapeHtml(medicine?.dosage?.am || medicine?.dosage?.en || "መረጃ አልቀረበም");

  const warningsEn = escapeHtml(medicine?.warnings?.en || "Information not provided");
  const warningsAm = escapeHtml(medicine?.warnings?.am || medicine?.warnings?.en || "መረጃ አልቀረበም");

  const card = document.createElement("div");
  card.className = "bg-white border border-navy-100 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow dynamic-lang-container";
  card.innerHTML = `
    <style>
      body[data-lang="en"] .lang-am { display: none !important; }
      body[data-lang="am"] .lang-en { display: none !important; }
    </style>
    <h3 class="font-bold text-2xl text-navy-900 mb-4 border-b border-navy-50 pb-3 flex items-center gap-2">
      💊 <span class="lang-en">${nameEn}</span><span class="lang-am">${nameAm}</span>
    </h3>
    
    <div class="space-y-4">
      <!-- Purpose Block -->
      <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <h4 class="font-bold text-blue-900 uppercase text-xs tracking-widest mb-2" data-i18n="search.purpose">Purpose & Uses</h4>
        <p class="text-sm text-navy-800 leading-relaxed lang-en">${purposeEn}</p>
        <p class="text-sm text-navy-800 leading-relaxed lang-am">${purposeAm}</p>
      </div>

      <!-- Dosage Block -->
      <div class="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
        <h4 class="font-bold text-emerald-900 uppercase text-xs tracking-widest mb-2" data-i18n="search.dosage">Dosage Info</h4>
        <p class="text-sm text-navy-800 leading-relaxed lang-en">${dosageEn}</p>
        <p class="text-sm text-navy-800 leading-relaxed lang-am">${dosageAm}</p>
      </div>

      <!-- Warnings Block (Scrollable for FDA data) -->
      <div class="bg-red-50 p-4 rounded-xl border border-red-100 max-h-64 overflow-y-auto">
        <h4 class="font-bold text-red-800 uppercase text-xs tracking-widest mb-2 flex items-center gap-1">
          ⚠️ <span data-i18n="search.warnings">Side Effects & Warnings</span>
        </h4>
        <p class="text-sm text-red-900 leading-relaxed whitespace-pre-line lang-en">${warningsEn}</p>
        <p class="text-sm text-red-900 leading-relaxed whitespace-pre-line lang-am">${warningsAm}</p>
      </div>
    </div>
  `;

  // Ensure i18n translates the new elements immediately
  if (typeof i18next !== 'undefined' && typeof i18next.t === 'function') {
      const labels = card.querySelectorAll('[data-i18n]');
      labels.forEach(el => {
          el.textContent = i18next.t(el.getAttribute('data-i18n'));
      });
  }

  return card;
}
