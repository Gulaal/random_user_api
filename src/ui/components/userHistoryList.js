export const renderUserHistoryList = (users) => {
  const container = document.createElement('div');
  container.className = 'history-list';
  
  if (users.length === 0) {
    container.innerHTML = '<div class="empty-history">История пуста. Загрузите первого пользователя!</div>';
    return container;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card history-item';
    card.addEventListener('click', () => {
        window.location.hash = `details/${user.id}`;
    });
    card.innerHTML = `
      <div class="user-avatar"><img src="${user.picture}" width="50" height="50" style="border-radius:50%;"></div>
      <div class="user-name" style="font-size:1.2rem;">${user.name.formatted}</div>
      <div class="user-info">${user.email}</div>
      <div class="user-info">${user.location.short}</div>
    `;

    card.addEventListener('click', () => {
      window.location.hash = `details/${user.id}`;
    });
    container.appendChild(card);
  });
  
  return container;
};