// Находим все зоны и тултип
const regions = document.querySelectorAll('.region');
const tooltip = document.getElementById('tooltip');
const container = document.querySelector('.map-container');

// Для каждой зоны вешаем обработчики
regions.forEach(region => {
  // При наведении мыши показываем тултип
  region.addEventListener('mouseenter', () => {
    const text = region.dataset.tooltip; // берём текст из data-tooltip
    if (text) {
      tooltip.textContent = text;
      tooltip.style.display = 'block';
    }
  });

  // При движении мыши обновляем позицию тултипа
  region.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    // Позиция мыши относительно контейнера
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Смещаем тултип немного вправо и вниз от курсора
    tooltip.style.left = (x + 15) + 'px';
    tooltip.style.top = (y + 15) + 'px';
  });

  // При уходе мыши скрываем тултип
  region.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
