import { createButton } from '../components/button.js';

export class UserDetailPage {
  constructor(containerId, userId, getUserByIdUseCase, onNavigateToHistory, onNavigateToMain) {
    this.container = document.getElementById(containerId);
    this.userId = userId;
    this.getUserByIdUseCase = getUserByIdUseCase;
    this.onNavigateToHistory = onNavigateToHistory;
    this.onNavigateToMain = onNavigateToMain;
  }

  async render() {
    this.showLoading();
    const result = await this.getUserByIdUseCase.execute(this.userId);
    if (result.success) {
      this.renderDetails(result.user);
    } else {
      this.showError(result.error);
    }
  }

  showLoading() {
    this.container.innerHTML = '<div class="loading-placeholder">Загрузка данных...</div>';
  }

  showError(message) {
    this.container.innerHTML = `
      <div class="error-message">${message}</div>
      <div class="button-group">
        ${createButton('Назад к истории', () => this.onNavigateToHistory()).outerHTML}
      </div>
    `;
  }

  renderDetails(user) {
    this.container.innerHTML = `
      <div class="user-card">
        <div class="user-avatar"><img src="${user.picture}" width="120" style="border-radius:50%;"></div>
        <div class="user-name">${user.name.formatted}</div>
        <div class="details">
          <div class="detail-row"><span class="detail-label">Email</span><span>${user.email}</span></div>
          <div class="detail-row"><span class="detail-label">Phone</span><span>${user.phone}</span></div>
          <div class="detail-row"><span class="detail-label">Адрес</span><span>${user.location.formatted}</span></div>
          <div class="detail-row"><span class="detail-label">Дата рождения</span><span>${user.dob}</span></div>
          <div class="detail-row"><span class="detail-label">Страна (nat)</span><span>${user.nat}</span></div>
          <div class="detail-row"><span class="detail-label">ID</span><span style="font-size:0.8rem;">${user.id}</span></div>
        </div>
      </div>
      <div class="button-group">
        <button class="btn" id="back-to-history">К истории</button>
        <button class="btn" id="back-to-main">На главную</button>
      </div>
    `;
    document.getElementById('back-to-history').onclick = () => this.onNavigateToHistory();
    document.getElementById('back-to-main').onclick = () => this.onNavigateToMain();
  }
}