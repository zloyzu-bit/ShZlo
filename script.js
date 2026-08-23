const regions = document.querySelectorAll('.region');
const tooltip = document.getElementById('tooltip');
const tooltipTitle = tooltip.querySelector('.tooltip-title');
const tooltipText = tooltip.querySelector('.tooltip-text');
const container = document.querySelector('.map-container');
const markerSchedule = [
  {
    hour: 23,
    minute: 40,
    daily: true,           // повторять каждый день
    type: 'image',         // PNG-метка
    x: 200,
    y: 150,
    href: 'marker.png',    // путь к файлу PNG
    width: 40,
    height: 40
  },
 

function createMarker(marker) {
  const svgNS = 'http://www.w3.org/2000/svg';
  let element;

  if (marker.type === 'circle') {
    element = document.createElementNS(svgNS, 'circle');
    element.setAttribute('cx', marker.x);
    element.setAttribute('cy', marker.y);
    element.setAttribute('r', marker.radius || 10);
    element.setAttribute('fill', marker.fill || 'red');
  } else if (marker.type === 'text') {
    element = document.createElementNS(svgNS, 'text');
    element.setAttribute('x', marker.x);
    element.setAttribute('y', marker.y);
    element.setAttribute('font-size', marker.size || 20);
    element.setAttribute('fill', marker.color || 'black');
    element.textContent = marker.text;
  } else if (marker.type === 'image') {
    element = document.createElementNS(svgNS, 'image');
    element.setAttribute('href', marker.href);       // или 'xlink:href' для старых браузеров
    element.setAttribute('x', marker.x);
    element.setAttribute('y', marker.y);
    if (marker.width) element.setAttribute('width', marker.width);
    if (marker.height) element.setAttribute('height', marker.height);
  }

  // Добавляем класс для возможной стилизации
  if (element) {
    element.classList.add('dynamic-marker');
  }
  return element;
}

// Функция добавления метки в SVG
function addMarkerToMap(marker) {
  const svg = document.getElementById('map-svg');
  if (!svg) {
    console.error('SVG с id="map-svg" не найден');
    return;
  }
  const newMarker = createMarker(marker);
  if (newMarker) {
    svg.appendChild(newMarker);
  }
}

// Проверка расписания и добавление меток
function checkSchedule() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  markerSchedule.forEach((marker) => {
    // Если время совпало и метка ещё не добавлена сегодня
    if (currentHour === marker.hour && currentMinute === marker.minute) {
      if (!marker.addedToday) {
        addMarkerToMap(marker);
        marker.addedToday = true;
      }
    } else {
      // Если время не совпало, сбрасываем флаг, чтобы на следующий день добавить снова
      marker.addedToday = false;
    }
  });
}

// Запуск проверки каждые 10 секунд (можно изменить на 60000 для проверки раз в минуту)
setInterval(checkSchedule, 10000);
// Первая проверка при загрузке
checkSchedule();

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


