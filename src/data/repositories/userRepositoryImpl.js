import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { fetchRandomUserRaw } from '../api/randomUserApi.js';
import { userMapper } from '../mappers/userMapper.js';

export class UserRepositoryImpl extends IUserRepository {
  async fetchRandomUser() {
    const rawUser = await fetchRandomUserRaw();
    return userMapper.toDomain(rawUser);
  }
}