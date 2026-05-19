export class AddUserToHistoryUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute(user) {
    try {
      await this.historyRepository.save(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}