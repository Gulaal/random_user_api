import { User } from '../entities/User.js';

export class GetAllUsersFromHistoryUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute() {
    try {
      const plainUsers = await this.historyRepository.getAll();
      const users = plainUsers.map(plain => User.fromPlain(plain));
      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}