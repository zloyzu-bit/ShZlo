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


const markerConfig = {
  addHour: 0,          // час появления (0 = полночь)
  addMinute: 10,       // минуты появления
  removeHour: 0,       // час исчезновения
  removeMinute: 12,     // минуты исчезновения
  x: 200,              // координата X на SVG (как в статике)
  y: 300,              // координата Y
  width: 50,           // ширина метки
  height: 50,          // высота метки
  src: 'marker.png'    // путь к файлу метки (проверьте имя)
};

const svg = document.querySelector('svg');
let markerElement = null; // здесь храним ссылку на добавленную метку

function isWithinDisplayPeriod() {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const start = markerConfig.addHour * 60 + markerConfig.addMinute;
  const end = markerConfig.removeHour * 60 + markerConfig.removeMinute;
  return totalMinutes >= start && totalMinutes < end;
}

function createMarker() {
  const NS = 'http://www.w3.org/2000/svg';
  const img = document.createElementNS(NS, 'image');
  img.setAttribute('href', markerConfig.src);
  img.setAttribute('x', markerConfig.x);
  img.setAttribute('y', markerConfig.y);
  img.setAttribute('width', markerConfig.width);
  img.setAttribute('height', markerConfig.height);
  img.classList.add('dynamic-marker'); // класс для возможной стилизации
  return img;
}

function addMarkerIfNeeded() {
  if (markerElement) return; // уже добавлена
  if (isWithinDisplayPeriod()) {
    markerElement = createMarker();
    svg.appendChild(markerElement);
    console.log('Метка добавлена:', new Date().toLocaleTimeString());
  }
}

function removeMarkerIfNeeded() {
  if (markerElement && !isWithinDisplayPeriod()) {
    markerElement.remove();
    markerElement = null;
    console.log('Метка удалена:', new Date().toLocaleTimeString());
  }
}

setInterval(() => {
  addMarkerIfNeeded();
  removeMarkerIfNeeded();
}, 10000);

addMarkerIfNeeded();
