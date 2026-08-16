// Находим все зоны и тултип
const regions = document.querySelectorAll('.region');
const tooltip = document.getElementById('tooltip');
const container = document.querySelector('.map-container');

// Функция для показа тултипа
function showTooltip(text, x, y) {
  tooltip.textContent = text;
  tooltip.style.display = 'block';
  // Позиционируем тултип относительно контейнера
  const rect = container.getBoundingClientRect();
  tooltip.style.left = (x - rect.left + 15) + 'px';
  tooltip.style.top = (y - rect.top + 15) + 'px';
}

// Функция для скрытия тултипа
function hideTooltip() {
  tooltip.style.display = 'none';
}

// Для каждой зоны вешаем обработчики
regions.forEach(region => {
  // === Поведение для мыши (наведение) ===
  region.addEventListener('mouseenter', (e) => {
    const text = region.dataset.tooltip;
    if (text) {
      showTooltip(text, e.clientX, e.clientY);
    }
  });

  region.addEventListener('mousemove', (e) => {
    const text = region.dataset.tooltip;
    if (text) {
      showTooltip(text, e.clientX, e.clientY);
    }
  });

  region.addEventListener('mouseleave', () => {
    hideTooltip();
  });

  // === Поведение для касаний (клик/тап) ===
  region.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы клик не всплывал к document и не скрывал тултип сразу
    const text = region.dataset.tooltip;
    if (text) {
      showTooltip(text, e.clientX, e.clientY);
    }
  });
});

// Скрываем тултип при клике в любом месте вне зон
document.addEventListener('click', (e) => {
  if (!e.target.closest('.region')) {
    hideTooltip();
  }
});
