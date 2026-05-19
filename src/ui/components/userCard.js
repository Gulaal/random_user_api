export const renderUserCard = (user) => {
  const ageGroup = user.getAgeGroup();
  const container = document.createElement('div');
  container.className = 'user-card';
  container.innerHTML = `
    <div class="user-avatar">
      <img src="${user.picture}" alt="avatar" loading="lazy">
    </div>
    <div class="user-name">${user.name.formatted}</div>
    <div class="user-info">${user.location.short} · ${user.dob} · ${ageGroup}</div>
    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Email</span>
        <span class="detail-value">${user.email}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-value">${user.phone}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Полный адрес</span>
        <span class="detail-value">${user.location.formatted}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Страна (nat)</span>
        <span class="detail-value">${user.nat}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Возрастная группа</span>
        <span class="detail-value">${ageGroup}</span>
      </div>
    </div>
  `;
  return container;
};