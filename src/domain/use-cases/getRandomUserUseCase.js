export class GetRandomUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const user = await this.userRepository.fetchRandomUser();
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}