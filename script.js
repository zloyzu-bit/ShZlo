// ==========================================
// ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ ДЛЯ ЗОН И МЕТОК
// ==========================================
function attachRegionEvents(region) {
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
}

// Привязываем события ко всем существующим зонам
document.querySelectorAll('.region').forEach(attachRegionEvents);

// Скрываем тултип при клике вне зон
document.addEventListener('click', (e) => {
  if (!e.target.closest('.region')) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.style.display = 'none';
  }
});

// ==========================================
// АВТОМАТИЧЕСКОЕ ДОБАВЛЕНИЕ МЕТКИ С ПОДСКАЗКОЙ
// ==========================================
const MARKER_CONFIG = {
  addHour: 02,          // час появления (0 = полночь)
  addMinute: 12,      // минуты появления
  removeHour: 06,       // час исчезновения
  removeMinute: 00,     // минуты исчезновения
  x: 200,              // координата X метки
  y: 300,              // координата Y метки
  width: 35,           // ширина метки
  height: 35,          // высота метки
  src: 'marker.png',   // путь к файлу метки
  title: 'Лавка смерти',      // заголовок подсказки
  desc: 'Тут готовы обменять осязаемое на осязаемое' // текст подсказки
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

  // Создаём группу-обёртку с классом region и данными для подсказки
  const group = document.createElementNS(NS, 'g');
  group.setAttribute('class', 'region');
  group.dataset.title = MARKER_CONFIG.title;
  group.dataset.desc = MARKER_CONFIG.desc;

  // Внутри группы создаём изображение
  const img = document.createElementNS(NS, 'image');
  img.setAttribute('href', MARKER_CONFIG.src);
  img.setAttribute('x', MARKER_CONFIG.x);
  img.setAttribute('y', MARKER_CONFIG.y);
  img.setAttribute('width', MARKER_CONFIG.width);
  img.setAttribute('height', MARKER_CONFIG.height);

  group.appendChild(img);
  return group;
}

function addMarker() {
  if (markerElement) return;
  if (isTimeInRange()) {
    markerElement = createMarkerElement();
    svg.appendChild(markerElement);
    attachRegionEvents(markerElement); // привязываем события к новой метке
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
}, 5000);

addMarker();
