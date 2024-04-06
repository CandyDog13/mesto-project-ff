export function renderLoading(isLoading, content) {
    if (isLoading) {
      content.disabled = true;
      content.textContent = 'Сохранение...'
    } else {
        content.disabled = false;
        content.textContent = 'Сохранить'
    }
  }