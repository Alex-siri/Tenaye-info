// Modern Pharmacy Locator Controller — Comprehensive Redesign 
// Features: Two-Way Map-Card Sync, Strict Filters, Mobile Responsiveness, HD CartoDB Tiles

let mapInstance = null;
let markersLayer = null;
let baseLayers = {};
let userMarker = null;
let pharmacyMarkersMap = {}; // Maps pharmacy ID to Leaflet Marker
let rawPharmacies = [];
let lastAccuracyMeters = null;
let currentUserCoords = { lat: 8.8872, lng: 38.8105 }; // Default AASTU Campus

// Shared Filter State
let filterState = {
  searchQuery: '',
  radiusLimitKm: 10,
  only247: false,
  sortBy: 'distance'
};

document.addEventListener('DOMContentLoaded', () => {
  // Render Core UI Shell
  renderHeaderAndFooter();

  // Initialize Language Support & Trigger Initial Location Fetch
  if (typeof initI18n === 'function') {
    initI18n(() => requestUserLocation());
  } else {
    requestUserLocation();
  }

  // Event Listeners for Controls
  setupEventListeners();
});

function renderHeaderAndFooter() {
  const headerContainer = document.getElementById('navbar-container');
  if (headerContainer && typeof renderNavbar === 'function') {
    headerContainer.appendChild(renderNavbar());
  }
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && typeof renderFooter === 'function') {
    footerContainer.appendChild(renderFooter());
  }
}

function setupEventListeners() {
  // Geolocation Request Button
  const geoBtn = document.getElementById('use-location-btn');
  if (geoBtn) {
    geoBtn.addEventListener('click', () => requestUserLocation(true));
  }

  // Search Input
  const searchInput = document.getElementById('pharmacy-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.searchQuery = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Radius Selection Dropdown
  const radiusSelect = document.getElementById('radius-filter-select');
  if (radiusSelect) {
    radiusSelect.addEventListener('change', (e) => {
      filterState.radiusLimitKm = parseFloat(e.target.value);
      // We must fetch from server again to ensure we have enough data (if widening)
      loadPharmacies(currentUserCoords.lat, currentUserCoords.lng, filterState.radiusLimitKm);
    });
  }

  // 24/7 Filter Toggle Button
  const btn247 = document.getElementById('filter-247-btn');
  const indicator247 = document.getElementById('filter-247-indicator');
  if (btn247) {
    btn247.addEventListener('click', () => {
      filterState.only247 = !filterState.only247;
      if (filterState.only247) {
        btn247.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
        if (indicator247) indicator247.classList.remove('hidden');
      } else {
        btn247.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
        if (indicator247) indicator247.classList.add('hidden');
      }
      applyFiltersAndRender();
    });
  }

  // Sorting Dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Mobile Filter Panel Toggle
  const mobileToggle = document.getElementById('mobile-filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  if (mobileToggle && filterPanel) {
    mobileToggle.addEventListener('click', () => {
      filterPanel.classList.toggle('hidden');
      filterPanel.classList.toggle('flex');
    });
  }
}

// 📡 Unified Location Processing
function requestUserLocation(manualClick = false) {
  const statusEl = document.getElementById('location-status');
  if (statusEl) {
    statusEl.textContent = '📡 Detecting GPS position...';
    statusEl.className = 'text-sm font-medium text-emerald-600 animate-pulse';
  }

  if (!navigator.geolocation) {
    if (statusEl) {
      statusEl.innerHTML = '📍 Approximate Location <span class="font-normal text-slate-500">(AASTU Campus Area)</span>';
      statusEl.className = 'text-sm font-semibold text-slate-700';
    }
    loadPharmacies(currentUserCoords.lat, currentUserCoords.lng, filterState.radiusLimitKm);
    return;
  }

  const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      currentUserCoords = { lat: latitude, lng: longitude };
      lastAccuracyMeters = accuracy;

      // Ensure Consistent Wording Based on True Accuracy
      if (statusEl) {
        if (accuracy <= 500) {
          statusEl.innerHTML = `📍 Accurate Location <span class="font-normal text-slate-500 text-[13px]">(accurate to ~${Math.round(accuracy)}m)</span>`;
          statusEl.className = 'text-sm font-bold text-emerald-700';
        } else {
          statusEl.innerHTML = `📍 Approximate Location <span class="font-normal text-slate-500 text-[13px]">(network area ~${(accuracy / 1000).toFixed(1)}km)</span>`;
          statusEl.className = 'text-sm font-semibold text-slate-700';
        }
      }

      loadPharmacies(latitude, longitude, filterState.radiusLimitKm, accuracy);
    },
    (error) => {
      console.warn('GPS location error:', error.message);
      if (statusEl) {
        statusEl.innerHTML = '📍 Approximate Location <span class="font-normal text-slate-500">(Default Area)</span>';
        statusEl.className = 'text-sm font-semibold text-slate-700';
      }
      loadPharmacies(currentUserCoords.lat, currentUserCoords.lng, filterState.radiusLimitKm);
    },
    gpsOptions
  );
}

// 🏥 API Fetch Engine
async function loadPharmacies(lat, lng, radiusKm = 10, accuracyMeters = null) {
  const container = document.getElementById('pharmacy-list-container');
  const loadingEl = document.getElementById('pharmacy-loading');

  if (loadingEl) loadingEl.classList.remove('hidden');
  if (container) container.innerHTML = '';

  try {
    const pharmacies = await pharmacyService.getNearbyPharmacies(lat, lng, radiusKm);
    rawPharmacies = pharmacies;

    if (loadingEl) loadingEl.classList.add('hidden');

    applyFiltersAndRender(accuracyMeters);
  } catch (error) {
    if (loadingEl) loadingEl.classList.add('hidden');
    if (container) {
      container.innerHTML = `
        <div class="p-8 text-center bg-red-50 rounded-2xl border border-red-200 shadow-sm mt-4">
          <p class="text-sm font-bold text-red-700">Unable to load nearby pharmacies.</p>
          <p class="text-sm text-red-600 mt-2">${error.message}</p>
        </div>
      `;
    }
  }
}

// 🔄 UI State Calculation
function applyFiltersAndRender(accuracyMeters = null) {
  const container = document.getElementById('pharmacy-list-container');
  const countEl = document.getElementById('results-count');
  const statusEl = document.getElementById('list-status');
  if (!container) return;

  const q = filterState.searchQuery.toLowerCase().trim();

  // Client-Side Strictly Enforced Filters
  let filtered = rawPharmacies.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.nameAm && p.nameAm.toLowerCase().includes(q)) ||
      p.address.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q);

    // Strictly enforce radius locally
    const matchesRadius = p.distanceKm <= filterState.radiusLimitKm;
    const matches247 = filterState.only247 ? p.isOpen247 : true;

    return matchesSearch && matchesRadius && matches247;
  });

  // Apply Client-Side Sort
  if (filterState.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // Update Counters & Render DOM
  if (countEl) countEl.textContent = filtered.length;
  if (statusEl) statusEl.textContent = `Within ${filterState.radiusLimitKm}km`;
  container.innerHTML = '';

  // Synchronize exactly those filtered items to the interactive Leaflet map
  updateMap(currentUserCoords.lat, currentUserCoords.lng, filtered, accuracyMeters || lastAccuracyMeters);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-10 text-center bg-white rounded-2xl border border-slate-200 mt-4 shadow-sm">
        <div class="text-4xl mb-4">🔍</div>
        <p class="text-base font-bold text-slate-800 mb-2">No pharmacies found</p>
        <p class="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          There are no pharmacies matching your current filters within ${filterState.radiusLimitKm}km of your location. Try expanding the search radius or clearing search keywords.
        </p>
      </div>
    `;
    if (typeof applyTranslations === 'function') applyTranslations();
    return;
  }

  // Render Pharmacy Cards with Two-Way Binding Callbacks
  filtered.forEach((p) => {
    // Pass hover handlers into the rendering function
    const cardEl = renderPharmacyListItem(
      p, 
      currentUserCoords,
      // onHover (Highlights map marker)
      (id) => highlightMapMarker(id),
      // onLeave (Removes map marker highlight)
      (id) => unhighlightMapMarker(id)
    );
    
    // Setup click-to-map sync
    cardEl.addEventListener('click', () => {
      if (mapInstance && pharmacyMarkersMap[p.id]) {
        mapInstance.setView([p.lat, p.lng], 16, { animate: true });
        pharmacyMarkersMap[p.id].openPopup();
        highlightCardFromMapClick(p.id);
      }
    });

    container.appendChild(cardEl);
  });

  if (typeof applyTranslations === 'function') applyTranslations();
}

// 🖱️ Two-way Card ➔ Map Interactions
function highlightMapMarker(id) {
  const markerWrapper = document.getElementById(`pin-wrapper-${id}`);
  if (markerWrapper) {
    markerWrapper.classList.add('hover-highlight');
  }
}

function unhighlightMapMarker(id) {
  const markerWrapper = document.getElementById(`pin-wrapper-${id}`);
  if (markerWrapper) {
    markerWrapper.classList.remove('hover-highlight');
  }
}

// 🖱️ Two-way Map ➔ Card Interactions
function highlightCardFromMapClick(pharmacyId) {
  // Clear all previous active states
  document.querySelectorAll('.pharmacy-list-card').forEach((el) => {
    el.classList.remove('border-emerald-500', 'ring-2', 'ring-emerald-200', 'bg-emerald-50/50');
  });

  // Find target card, highlight and smooth scroll
  const card = document.getElementById(`pharmacy-card-${pharmacyId}`);
  if (card) {
    card.classList.add('border-emerald-500', 'ring-2', 'ring-emerald-200', 'bg-emerald-50/50');
    // Offset for floating sticky header if needed
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 🗺️ Leaflet Map Generation
function updateMap(userLat, userLng, pharmacies, accuracyMeters = null) {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  pharmacyMarkersMap = {};

  // Initialize Map Engine with Modern Premium Tiles
  if (!mapInstance) {
    const cartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    });

    const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    });

    baseLayers = {
      "🗺️ Street View (CartoDB)": cartoVoyager,
      "🛰️ Satellite View (Esri)": esriSatellite
    };

    mapInstance = L.map('map', {
      center: [userLat, userLng],
      zoom: 14,
      zoomControl: false, // Move zoom control
      layers: [cartoVoyager]
    });

    // Replace Zoom Control for Accessibility Minimum Touch Target Size
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
    // Add Layer Control
    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(mapInstance);
    
    markersLayer = L.layerGroup().addTo(mapInstance);

    // Click Map anywhere ➔ Relocate instantly
    mapInstance.on('click', (e) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;
      currentUserCoords = { lat: clickedLat, lng: clickedLng };
      
      const statusEl = document.getElementById('location-status');
      if (statusEl) {
        statusEl.innerHTML = `📍 Custom Location <span class="font-normal text-slate-500 text-[13px]">(Map Pin)</span>`;
        statusEl.className = 'text-sm font-bold text-emerald-700';
      }
      
      // Reload based on custom exact point
      loadPharmacies(clickedLat, clickedLng, filterState.radiusLimitKm);
    });
  } else {
    // Clear live pins but preserve engine
    markersLayer.clearLayers();
    mapInstance.setView([userLat, userLng], 14);
  }

  // 1️⃣ Plot User's Root Location
  plotUserLocation(userLat, userLng, accuracyMeters);

  // 2️⃣ Plot Active Pharmacy Pins (100% matched to filter array)
  const currentLang = localStorage.getItem('language') || 'en';

  pharmacies.forEach((p) => {
    const displayName = currentLang === 'am' && p.nameAm ? p.nameAm : p.name;
    const is247 = p.isOpen247;
    
    // Inline styling for the custom HTML marker
    const markerHtml = `
      <div id="pin-wrapper-${p.id}" class="custom-medical-cross-marker" style="background-color: ${is247 ? '#059669' : '#1e293b'}; color: white; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; cursor: pointer;">
        🏥
      </div>
    `;

    const crossIcon = L.divIcon({
      className: 'bg-transparent border-none', // Override Leaflet defaults
      html: markerHtml,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17]
    });

    const marker = L.marker([p.lat, p.lng], { icon: crossIcon, alt: displayName }).addTo(markersLayer);
    pharmacyMarkersMap[p.id] = marker;

    // Interactive Two-Way Setup (Map ➔ List Card)
    marker.on('mouseover', () => highlightCardFromMapClick(p.id));
    marker.on('mouseout', () => {
      const card = document.getElementById(`pharmacy-card-${p.id}`);
      if (card) card.classList.remove('border-emerald-500', 'ring-2', 'ring-emerald-200', 'bg-emerald-50/50');
    });
    
    marker.on('click', () => {
      highlightCardFromMapClick(p.id);
    });

    // Popup Data Panel
    const statusPill = is247
      ? `<span style="background: #10b981; color: white; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.5px;">24/7 Open</span>`
      : `<span style="background: #e2e8f0; color: #475569; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 99px; text-transform: uppercase;">Standard Hours</span>`;

    const navUrl = `https://www.openstreetmap.org/directions?engine=osrm_car&route=${userLat},${userLng};${p.lat},${p.lng}`;

    marker.bindPopup(`
      <div style="font-family: inherit; min-width: 200px; padding: 2px;">
        <div style="margin-bottom: 8px;">${statusPill}</div>
        <h4 style="margin: 0 0 4px 0; color: #022c22; font-size: 15px; font-weight: 800; line-height: 1.2;">
          ${displayName}
        </h4>
        <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.4;">
          ${p.address}
        </p>
        <div style="margin-top: 8px; font-size: 13px; font-weight: 700; color: #059669;">
          📍 ${p.distanceKm} km away
        </div>
        <a href="${navUrl}" target="_blank" style="display: block; width: 100%; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: 10px; background: none; color: #059669; font-weight: 800; text-decoration: none; text-align: center; font-size: 13px;">
          Get Directions ➔
        </a>
      </div>
    `, { 
      maxWidth: 300,
      className: 'custom-rounded-popup' 
    });
  });
}

function plotUserLocation(lat, lng, accuracyMeters) {
  const isPrecise = accuracyMeters && accuracyMeters <= 500;
  
  // Create animated pulsing UI dot
  const blueDotHtml = `
    <div class="relative flex items-center justify-center w-8 h-8">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
      <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-[3px] border-white shadow shadow-black/30"></span>
    </div>
  `;

  const dotIcon = L.divIcon({
    className: 'bg-transparent border-none',
    html: blueDotHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  // Text alignment matches overarching logic
  const popupHeading = isPrecise ? '📍 Accurate Location' : '📍 Approximate Location';

  userMarker = L.marker([lat, lng], { icon: dotIcon, draggable: true })
    .addTo(markersLayer)
    .bindPopup(`<strong style="color: #1e40af; font-size: 14px;">${popupHeading}</strong><br/><span style="color: #64748b; font-size: 12px;">Drag this dot or click the map to move layout.</span>`)
    .openPopup();

  // Allow Drag & Drop Repositioning
  userMarker.on('dragend', (event) => {
    const newPos = event.target.getLatLng();
    currentUserCoords = { lat: newPos.lat, lng: newPos.lng };
    const statusEl = document.getElementById('location-status');
    if (statusEl) {
      statusEl.innerHTML = `📍 Custom Location <span class="font-normal text-slate-500 text-[13px]">(Dragged Pin)</span>`;
      statusEl.className = 'text-sm font-bold text-emerald-700';
    }
    loadPharmacies(newPos.lat, newPos.lng, filterState.radiusLimitKm);
  });

  // Plot shaded visual radius reflecting GPS uncertainty
  const calculatedRadius = (accuracyMeters && accuracyMeters < 5000) ? Math.min(accuracyMeters, 1500) : 400;
  L.circle([lat, lng], {
    color: '#3b82f6',
    weight: 2,
    opacity: 0.8,
    fillColor: '#60a5fa',
    fillOpacity: 0.15,
    radius: calculatedRadius,
    interactive: false // So it doesn't block clicks on the map beneath it
  }).addTo(markersLayer);
}
