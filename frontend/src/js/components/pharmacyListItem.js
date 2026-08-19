// Reusable Component for Rendering One Pharmacy Result Card
function renderPharmacyListItem(pharmacy, userCoords = null, onHover = null, onLeave = null) {
  const currentLang = localStorage.getItem('language') || 'en';
  const displayName = currentLang === 'am' && pharmacy.nameAm ? pharmacy.nameAm : pharmacy.name;

  const card = document.createElement('div');
  // Two-way binding hook classes & hover lift effect
  card.className = 'pharmacy-list-card bg-white rounded-2xl p-5 shadow-sm border border-navy-100 hover:shadow-lg hover:-translate-y-0.5 hover:border-gold-500 transition-all duration-300 relative flex flex-col justify-between cursor-pointer group';
  
  // Set ID for linking to map
  card.setAttribute('id', `pharmacy-card-${pharmacy.id}`);

  // OSRM Routing link
  const mapUrl = userCoords && userCoords.lat && userCoords.lng
    ? `https://www.openstreetmap.org/directions?engine=osrm_car&route=${userCoords.lat},${userCoords.lng};${pharmacy.lat},${pharmacy.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;

  // Accessible Status Badge with non-color dot indicator
  const statusBadge = pharmacy.isOpen247
    ? `<span class="inline-flex items-center gap-1.5 bg-gold-400/20 text-gold-600 text-xs font-bold px-2.5 py-1 rounded-full border border-gold-400/50">
         <span class="w-2 h-2 rounded-full bg-gold-500"></span> Open 24/7
       </span>`
    : `<span class="inline-flex items-center gap-1.5 bg-navy-50 text-navy-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-navy-100">
         <span class="w-1.5 h-1.5 rounded-full bg-navy-800/50"></span> Standard Hours
       </span>`;

  card.innerHTML = `
    <div>
      <div class="flex items-start justify-between gap-4 mb-3">
        <h3 class="font-bold text-lg text-navy-900 leading-tight group-hover:text-gold-600 transition-colors">${displayName}</h3>
        
        <!-- Distance Badge Fixed to Top Right -->
        <div class="flex flex-col items-end shrink-0">
          <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-navy-50 text-navy-800 border border-navy-100 shadow-sm">
            ${pharmacy.distanceKm} km
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 mb-4">
        ${statusBadge}
      </div>

      <div class="space-y-2.5 text-sm text-navy-800 mb-6">
        <!-- Consistent Icons: Location Pin -->
        <div class="flex items-start gap-2.5">
          <svg class="w-4 h-4 text-gold-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="leading-snug">${pharmacy.address}, ${pharmacy.city}</span>
        </div>
        
        <!-- Consistent Icons: Phone -->
        <div class="flex items-center gap-2.5">
          <svg class="w-4 h-4 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <a href="tel:${pharmacy.phone}" class="hover:text-gold-600 font-medium transition-colors" @click.stop>${pharmacy.phone}</a>
        </div>
        
        <!-- Consistent Icons: Clock -->
        <div class="flex items-center gap-2.5">
          <svg class="w-4 h-4 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="font-medium">${pharmacy.hours}</span>
        </div>
      </div>
    </div>

    <!-- Get Directions Action -->
    <div class="pt-4 border-t border-navy-100">
      <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" 
         aria-label="Get directions to ${displayName}"
         class="touch-target w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-navy-900 hover:bg-navy-950 focus:ring-4 focus:ring-gold-400 text-gold-400 text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all group-hover:bg-navy-950">
        <!-- Clear Navigation Arrow -->
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        <span data-i18n="pharmacy.directions">Get Directions</span>
      </a>
    </div>
  `;

  // Two-way map binding event listeners
  if (onHover) card.addEventListener('mouseenter', () => onHover(pharmacy.id));
  if (onLeave) card.addEventListener('mouseleave', () => onLeave(pharmacy.id));

  return card;
}
