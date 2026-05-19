import { renderUserCard } from '../components/userCard.js';
import { createButton } from '../components/button.js';

export class MainPage {
  constructor(containerId, refreshUserUseCase, addUserToHistoryUseCase, currentUserRepository) {
    this.container = document.getElementById(containerId);
    this.refreshUserUseCase = refreshUserUseCase;
    this.addUserToHistoryUseCase = addUserToHistoryUseCase;
    this.currentUserRepository = currentUserRepository;
  }

  async init() {
    const savedUser = this.currentUserRepository.get();
    if (savedUser) {
      this.renderUserContent(savedUser);
    } else {
      await this.loadNewUser();
    }
  }

  async loadNewUser() {
    this.showLoading();
    const result = await this.refreshUserUseCase.execute();
    if (result.success) {
      await this.addUserToHistoryUseCase.execute(result.user);
      this.currentUserRepository.save(result.user);
      this.renderUserContent(result.user);
    } else {
      this.showError(result.error);
    }
  }

  showLoading() {
    this.container.innerHTML = '<div class="loading-placeholder">Загрузка...</div>';
  }

  showError(message) {
    this.container.innerHTML = `
      <div class="error-message">Ошибка: ${message}</div>
      <div class="button-group">
        ${createButton('Повторить', () => this.loadNewUser()).outerHTML}
      </div>
    `;
  }

  renderUserContent(user) {
    this.container.innerHTML = '';
    const userCard = renderUserCard(user);
    const refreshBtn = createButton('Следующий пользователь', () => this.loadNewUser());
    const historyBtn = createButton('История', () => window.location.hash = 'history');
    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';
    btnGroup.appendChild(refreshBtn);
    btnGroup.appendChild(historyBtn);
    this.container.appendChild(userCard);
    this.container.appendChild(btnGroup);
  }
}