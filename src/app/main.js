import { UserRepositoryImpl } from '../data/repositories/userRepositoryImpl.js';
import { LocalStorageUserHistoryRepository } from '../data/repositories/localStorageUserHistoryRepository.js';
import { LocalStorageCurrentUserRepository } from '../data/repositories/localStorageCurrentUserRepository.js';
import { GetRandomUserUseCase } from '../domain/use-cases/getRandomUserUseCase.js';
import { AddUserToHistoryUseCase } from '../domain/use-cases/addUserToHistoryUseCase.js';
import { GetAllUsersFromHistoryUseCase } from '../domain/use-cases/getAllUsersFromHistoryUseCase.js';
import { ClearHistoryUseCase } from '../domain/use-cases/clearHistoryUseCase.js';
import { GetUserByIdUseCase } from '../domain/use-cases/getUserByIdUseCase.js';
import { MainPage } from '../ui/pages/mainPage.js';
import { HistoryPage } from '../ui/pages/historyPage.js';
import { UserDetailPage } from '../ui/pages/userDetailPage.js';

const userRepository = new UserRepositoryImpl();
const historyRepository = new LocalStorageUserHistoryRepository();
const currentUserRepository = new LocalStorageCurrentUserRepository();

const getRandomUserUseCase = new GetRandomUserUseCase(userRepository);
const addUserToHistoryUseCase = new AddUserToHistoryUseCase(historyRepository);
const getAllUsersHistoryUseCase = new GetAllUsersFromHistoryUseCase(historyRepository);
const clearHistoryUseCase = new ClearHistoryUseCase(historyRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(historyRepository);

function renderRoute() {
  const hash = window.location.hash.slice(1) || 'main';
  const [route, param] = hash.split('/');
  const root = document.getElementById('app-root');

  if (route === 'main') {
    const mainPage = new MainPage(
        'app-root',
        { execute: () => getRandomUserUseCase.execute() },
        addUserToHistoryUseCase,
        currentUserRepository
    );
    mainPage.init();
  } 
  else if (route === 'history') {
    const historyPage = new HistoryPage(
      'app-root',
      getAllUsersHistoryUseCase,
      clearHistoryUseCase,
      () => window.location.hash = 'main'
    );
    historyPage.render();
  }
  else if (route === 'details' && param) {
    const detailPage = new UserDetailPage(
      'app-root',
      param,
      getUserByIdUseCase,
      () => window.location.hash = 'history',
      () => window.location.hash = 'main'
    );
    detailPage.render();
  }
  else {
    window.location.hash = 'main';
  }
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) window.location.hash = 'main';
  renderRoute();
});