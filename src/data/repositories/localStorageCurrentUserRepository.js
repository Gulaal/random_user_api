import { User } from '../../domain/entities/User.js';

const STORAGE_KEY = 'current_user';

export class LocalStorageCurrentUserRepository {
  save(user) {
    if (user) {
      const plain = { ...user };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plain));
    }
  }

  get() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const plain = JSON.parse(raw);
    return User.fromPlain(plain);
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}