import logger from '@lib/logger';
import { User, UserRole, UserPayload, RegisterRequest } from '../types/auth';
import PasswordService from '@services/password.service';
import { databaseService, PrismaClient } from './database.service';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = databaseService.getClient();
  }

  async getAllUsers(): Promise<UserPayload[]> {
    logger.info('Fetching all users');
    const users = await this.prisma.user.findMany();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
    }));
  }

  async findById(id: string): Promise<User | null> {
    logger.info(`Finding user by ID: ${id}`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user as User | null;
  }

  async findByUsername(username: string): Promise<User | null> {
    logger.info(`Finding user by username: ${username}`);
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    logger.info(`Finding user by email: ${email}`);
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user as User | null;
  }

  async createUser(
    userData: RegisterRequest,
    createdByRole: UserRole = UserRole.ADMIN
  ): Promise<UserPayload> {
    logger.info('Creating new user', {
      username: userData.username,
      email: userData.email,
      role: userData.role,
    });

    // Check if user already exists
    const existingUserByUsername = await this.findByUsername(userData.username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    const existingUserByEmail = await this.findByEmail(userData.email);
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }

    // Validate password strength
    const passwordValidation = PasswordService.validatePasswordStrength(userData.password);
    if (!passwordValidation.isValid) {
      throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
    }

    // Hash password
    const hashedPassword = await PasswordService.hashPassword(userData.password);

    // Determine role - only admins can create other admins
    let userRole = userData.role || UserRole.VIEWER;
    if (userRole === UserRole.ADMIN && createdByRole !== UserRole.ADMIN) {
      userRole = UserRole.OPERATOR; // Downgrade to operator if not created by admin
    }

    const newUser = await this.prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userRole as string,
        isActive: true,
      },
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role as UserRole,
    };
  }

  async updateUser(
    id: string,
    userData: Partial<Omit<User, 'id' | 'createdAt' | 'password'>>,
    updatedByRole: UserRole = UserRole.ADMIN
  ): Promise<UserPayload | null> {
    logger.info(`Updating user with ID: ${id}`);
    const currentUser = await this.findById(id);
    if (!currentUser) {
      return null;
    }

    // Role update restrictions
    if (userData.role && userData.role !== currentUser.role) {
      // Only admins can change roles
      if (updatedByRole !== UserRole.ADMIN) {
        throw new Error('Only administrators can change user roles');
      }
      // Only admins can promote to admin
      if (userData.role === UserRole.ADMIN && updatedByRole !== UserRole.ADMIN) {
        throw new Error('Only administrators can promote users to admin role');
      }
    }

    // Check for unique username/email if being updated
    if (userData.username && userData.username !== currentUser.username) {
      const existingUser = await this.findByUsername(userData.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }

    if (userData.email && userData.email !== currentUser.email) {
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: userData.username,
        email: userData.email,
        role: userData.role as string,
        isActive: userData.isActive,
      },
    });

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role as UserRole,
    };
  }

  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    logger.info(`Updating password for user: ${id}`);
    const user = await this.findById(id);
    if (!user) {
      return false;
    }

    // Validate password strength
    const passwordValidation = PasswordService.validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`);
    }

    // Hash new password
    const hashedPassword = await PasswordService.hashPassword(newPassword);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return true;
  }

  async deleteUser(id: string, deletedByRole: UserRole = UserRole.ADMIN): Promise<boolean> {
    logger.info(`Deleting user with ID: ${id}`);
    const userToDelete = await this.findById(id);
    if (!userToDelete) {
      return false;
    }

    // Prevent deletion of admin users by non-admins
    if (userToDelete.role === UserRole.ADMIN && deletedByRole !== UserRole.ADMIN) {
      throw new Error('Only administrators can delete admin users');
    }

    // Prevent deletion of the last admin user
    const adminCount = await this.prisma.user.count({
      where: { role: UserRole.ADMIN, isActive: true },
    });
    if (userToDelete.role === UserRole.ADMIN && adminCount <= 1) {
      throw new Error('Cannot delete the last active administrator');
    }

    await this.prisma.user.delete({ where: { id } });
    return true;
  }

  async deactivateUser(id: string, deactivatedByRole: UserRole = UserRole.ADMIN): Promise<boolean> {
    logger.info(`Deactivating user with ID: ${id}`);
    const userToDeactivate = await this.findById(id);
    if (!userToDeactivate) {
      return false;
    }

    // Prevent deactivation of admin users by non-admins
    if (userToDeactivate.role === UserRole.ADMIN && deactivatedByRole !== UserRole.ADMIN) {
      throw new Error('Only administrators can deactivate admin users');
    }

    // Prevent deactivation of the last admin user
    const activeAdminCount = await this.prisma.user.count({
      where: { role: UserRole.ADMIN, isActive: true },
    });
    if (userToDeactivate.role === UserRole.ADMIN && activeAdminCount <= 1) {
      throw new Error('Cannot deactivate the last active administrator');
    }

    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return true;
  }

  async activateUser(id: string): Promise<boolean> {
    logger.info(`Activating user with ID: ${id}`);
    const user = await this.findById(id);
    if (!user) {
      return false;
    }

    await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });

    return true;
  }
}

export const userService = new UserService();
export default userService;
