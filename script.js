// ==========================================
// 1. ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ ДЛЯ ЗОН
// ==========================================
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
// 2. АВТОМАТИЧЕСКОЕ ДОБАВЛЕНИЕ МЕТКИ ПО ВРЕМЕНИ
// ==========================================
const MARKER_CONFIG = {
  addHour: 0,
  addMinute: 29,
  removeHour: 0,
  removeMinute: 30,
  x: 200,
  y: 300,
  width: 50,
  height: 50,
  src: 'marker.png'
};

const svg = document.querySelector('svg');
let markerElement = null;

function isTimeInRange() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = MARKER_CONFIG.addHour * 60 + MARKER_CONFIG.addMinute;
  const end = MARKER_CONFIG.removeHour * 60 + MARKER_CONFIG.removeMinute;
  return currentMinutes >= start && currentMinutes < end;
}

function createMarkerElement() {
  const NS = 'http://www.w3.org/2000/svg';
  const img = document.createElementNS(NS, 'image');
  img.setAttribute('href', MARKER_CONFIG.src);
  img.setAttribute('x', MARKER_CONFIG.x);
  img.setAttribute('y', MARKER_CONFIG.y);
  img.setAttribute('width', MARKER_CONFIG.width);
  img.setAttribute('height', MARKER_CONFIG.height);
  img.classList.add('dynamic-marker');
  return img;
}

function addMarker() {
  if (markerElement) return;
  if (isTimeInRange()) {
    markerElement = createMarkerElement();
    svg.appendChild(markerElement);
    console.log('Метка добавлена в', new Date().toLocaleTimeString());
  }
}

function removeMarker() {
  if (markerElement && !isTimeInRange()) {
    markerElement.remove();
    markerElement = null;
    console.log('Метка удалена в', new Date().toLocaleTimeString());
  }
}

setInterval(() => {
  addMarker();
  removeMarker();
}, 10000);

addMarker();
