import { User } from '../entities/User.js';

export class GetUserByIdUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute(id) {
    try {
      const plainUsers = await this.historyRepository.getAll();
      const plainUser = plainUsers.find(u => u.id === id);
      if (!plainUser) {
        return { success: false, error: 'Пользователь не найден' };
      }
      const user = User.fromPlain(plainUser);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}