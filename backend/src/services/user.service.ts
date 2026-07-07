import { UserRepository } from '../repositories/user.repository';
import { Prisma } from '@prisma/client';

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(data: Prisma.UserCreateInput) {
    if (!data.email) throw new Error('Email is required');
    
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // In a real application, password hashing happens here
    return this.userRepository.create(data);
  }

  async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updatePreferences(userId: string, data: Prisma.UserUpdateInput) {
    return this.userRepository.update(userId, data);
  }
}
