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
// АВТОМАТИЧЕСКОЕ ДОБАВЛЕНИЕ/УДАЛЕНИЕ МЕТКИ ПО ВРЕМЕНИ
// ==========================================

// Настройки
const ADD_HOUR = 23;      // час добавления (0 = полночь)
const ADD_MINUTE = 50;   // минуты добавления
const REMOVE_HOUR = 6;   // час удаления
const REMOVE_MINUTE = 0; // минуты удаления

const svg = document.getElementById('map-svg');
let markerElement = null;       // здесь будет ссылка на добавленную метку
let markerAddedToday = false;   // флаг, что метка уже добавлена сегодня

// Функция создания PNG-метки (SVG <image>)
function createPngMarker() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const img = document.createElementNS(svgNS, 'image');
  img.setAttribute('href', 'marker.png');      // путь к вашему PNG
  img.setAttribute('x', '200');                // координата X (подберите свою)
  img.setAttribute('y', '150');                // координата Y
  img.setAttribute('width', '40');             // ширина метки
  img.setAttribute('height', '40');            // высота метки
  img.classList.add('dynamic-marker');         // класс для стилизации (необязательно)
  return img;
}

// Функция добавления метки
function addMarker() {
  if (!svg || markerAddedToday) return;
  markerElement = createPngMarker();
  svg.appendChild(markerElement);
  markerAddedToday = true;
  console.log('Метка добавлена в', new Date().toLocaleTimeString());
}

// Функция удаления метки
function removeMarker() {
  if (markerElement) {
    markerElement.remove();
    markerElement = null;
    markerAddedToday = false; // сбрасываем, чтобы завтра снова добавить
    console.log('Метка удалена в', new Date().toLocaleTimeString());
  }
}

// Проверка текущего времени и выполнение действий
function checkTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  // Добавление метки в заданное время
  if (h === ADD_HOUR && m === ADD_MINUTE && !markerAddedToday) {
    addMarker();
  }

  // Удаление метки в заданное время
  if (h === REMOVE_HOUR && m === REMOVE_MINUTE && markerElement) {
    removeMarker();
  }
}

// Запускаем проверку каждые 10 секунд (можно изменить на 60000 для проверки раз в минуту)
setInterval(checkTime, 10000);

// Первая проверка при загрузке страницы
checkTime();
