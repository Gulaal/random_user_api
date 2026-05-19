import { renderUserHistoryList } from '../components/userHistoryList.js';
import { createButton } from '../components/button.js';

export class HistoryPage {
  constructor(containerId, getAllUsersHistoryUseCase, clearHistoryUseCase, onNavigateToMain) {
    this.container = document.getElementById(containerId);
    this.getAllUsersHistoryUseCase = getAllUsersHistoryUseCase;
    this.clearHistoryUseCase = clearHistoryUseCase;
    this.onNavigateToMain = onNavigateToMain;
  }

  async render() {
    this.showLoading();
    const result = await this.getAllUsersHistoryUseCase.execute();
    if (result.success) {
      this.renderHistory(result.users);
    } else {
      this.showError(result.error);
    }
  }

  showLoading() {
    this.container.innerHTML = '<div class="loading-placeholder">Загрузка истории...</div>';
  }

  showError(message) {
    this.container.innerHTML = `<div class="error-message">Ошибка: ${message}</div>`;
    const backBtn = createButton('На главную', () => this.onNavigateToMain());
    this.container.appendChild(backBtn);
  }

  renderHistory(users) {
    this.container.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = `История пользователей (${users.length})`;
    title.style.marginBottom = '1rem';
    this.container.appendChild(title);

    const list = renderUserHistoryList(users);
    this.container.appendChild(list);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    
    const backBtn = createButton('На главную', () => this.onNavigateToMain());
    const clearBtn = createButton('Очистить историю', async () => {
      if (confirm('Вы уверены? История будет удалена безвозвратно.')) {
        await this.clearHistoryUseCase.execute();
        this.render();
      }
    });
    
    buttonGroup.appendChild(backBtn);
    buttonGroup.appendChild(clearBtn);
    this.container.appendChild(buttonGroup);
  }
}