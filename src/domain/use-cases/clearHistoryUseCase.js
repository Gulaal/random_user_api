export class ClearHistoryUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }
  async execute() {
    try {
      await this.historyRepository.clear();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}