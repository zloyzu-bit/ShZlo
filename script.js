const regions = document.querySelectorAll('.region');
const tooltip = document.getElementById('tooltip');
const tooltipTitle = tooltip.querySelector('.tooltip-title');
const tooltipText = tooltip.querySelector('.tooltip-text');
const container = document.querySelector('.map-container');

function showTooltip(title, desc, x, y) {
  tooltipTitle.textContent = title;
  tooltipText.textContent = desc;
  tooltip.style.display = 'block';
  const rect = container.getBoundingClientRect();
  tooltip.style.left = (x - rect.left + 15) + 'px';
  tooltip.style.top = (y - rect.top + 15) + 'px';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

regions.forEach(region => {
  region.addEventListener('mouseenter', (e) => {
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) {
      showTooltip(title, desc, e.clientX, e.clientY);
    }
  });

  region.addEventListener('mousemove', (e) => {
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) {
      showTooltip(title, desc, e.clientX, e.clientY);
    }
  });

  region.addEventListener('mouseleave', hideTooltip);

  region.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) {
      showTooltip(title, desc, e.clientX, e.clientY);
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.region')) {
    hideTooltip();
  }
});
const regions = document.querySelectorAll('.region');
const tooltip = document.getElementById('tooltip');
const tooltipTitle = tooltip?.querySelector('.tooltip-title');
const tooltipText = tooltip?.querySelector('.tooltip-text');
const container = document.querySelector('.map-container');

function showTooltip(title, desc, x, y) {
  if (!tooltip) return;
  if (tooltipTitle) tooltipTitle.textContent = title;
  if (tooltipText) tooltipText.textContent = desc;
  tooltip.style.display = 'block';
  const rect = container.getBoundingClientRect();
  tooltip.style.left = (x - rect.left + 15) + 'px';
  tooltip.style.top = (y - rect.top + 15) + 'px';
}

function hideTooltip() {
  if (tooltip) tooltip.style.display = 'none';
}

regions.forEach(region => {
  region.addEventListener('mouseenter', (e) => {
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) showTooltip(title, desc, e.clientX, e.clientY);
  });

  region.addEventListener('mousemove', (e) => {
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) showTooltip(title, desc, e.clientX, e.clientY);
  });

  region.addEventListener('mouseleave', hideTooltip);

  region.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = region.dataset.title;
    const desc = region.dataset.desc;
    if (title) showTooltip(title, desc, e.clientX, e.clientY);
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.region')) hideTooltip();
});

// ==========================================
// АВТОМАТИЧЕСКОЕ ДОБАВЛЕНИЕ/УДАЛЕНИЕ PNG-МЕТКИ ПО ВРЕМЕНИ
// ==========================================

// Настройки
const ADD_HOUR = 0;      // час добавления (0 = полночь)
const ADD_MINUTE = 40;   // минуты добавления
const REMOVE_HOUR = 6;   // час удаления
const REMOVE_MINUTE = 0; // минуты удаления

const mapContainer = document.getElementById('mapContainer'); // id контейнера
let markerElement = null;
let markerAddedToday = false;

// Функция создания метки (HTML <img>)
function createPngMarker() {
  const img = document.createElement('img');
  img.src = 'marker.png';        // путь к вашей PNG-метке
  img.className = 'dynamic-marker';
  // Задаём координаты в процентах или пикселях относительно контейнера
  img.style.left = '25%';        // например, 25% от ширины контейнера
  img.style.top = '30%';         // 30% от высоты
  img.style.width = '40px';      // ширина метки
  img.style.height = '40px';     // высота метки
  return img;
}

// Добавление метки
function addMarker() {
  if (!mapContainer || markerAddedToday) return;
  markerElement = createPngMarker();
  mapContainer.appendChild(markerElement);
  markerAddedToday = true;
  console.log('Метка добавлена в', new Date().toLocaleTimeString());
}

// Удаление метки
function removeMarker() {
  if (markerElement) {
    markerElement.remove();
    markerElement = null;
    markerAddedToday = false;
    console.log('Метка удалена в', new Date().toLocaleTimeString());
  }
}

// Проверка времени
function checkTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  if (h === ADD_HOUR && m === ADD_MINUTE && !markerAddedToday) {
    addMarker();
  }

  if (h === REMOVE_HOUR && m === REMOVE_MINUTE && markerElement) {
    removeMarker();
  }
}

// Запускаем проверку каждые 10 секунд (можно 60000)
setInterval(checkTime, 10000);
checkTime();
