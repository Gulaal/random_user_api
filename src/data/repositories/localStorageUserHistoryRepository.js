import { IUserHistoryRepository } from '../../domain/repositories/IUserHistoryRepository.js';
import { toPersistence } from '../mappers/userHistoryMapper.js';

const STORAGE_KEY = 'randomuser_history';

export class LocalStorageUserHistoryRepository extends IUserHistoryRepository {
  async save(user) {
    try {
      const plainUser = toPersistence(user);
      const users = await this.getAll();
      const exists = users.some(u => u.id === plainUser.id);
      if (!exists) {
        users.push(plainUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}