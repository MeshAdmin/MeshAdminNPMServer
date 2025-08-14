import { UserService } from '@services/user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = await userService.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
      expect(users[0]).toHaveProperty('createdAt');
      expect(users[0]).toHaveProperty('updatedAt');
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const user = await userService.getUserById(1);

      expect(user).toBeTruthy();
      expect(user?.id).toBe(1);
      expect(user?.name).toBe('John Doe');
    });

    it('should return null when user not found', async () => {
      const user = await userService.getUserById(999);

      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const newUser = await userService.createUser(userData);

      expect(newUser).toHaveProperty('id');
      expect(newUser.name).toBe(userData.name);
      expect(newUser.email).toBe(userData.email);
      expect(newUser).toHaveProperty('createdAt');
      expect(newUser).toHaveProperty('updatedAt');

      // Verify user was added to the collection
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(3);
    });
  });

  describe('updateUser', () => {
    it('should update existing user', async () => {
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedUser = await userService.updateUser(1, updateData);

      expect(updatedUser).toBeTruthy();
      expect(updatedUser?.name).toBe(updateData.name);
      expect(updatedUser?.email).toBe(updateData.email);
      expect(updatedUser?.id).toBe(1);
    });

    it('should return null when user not found', async () => {
      const updatedUser = await userService.updateUser(999, { name: 'Test' });

      expect(updatedUser).toBeNull();
    });

    it('should partially update user', async () => {
      const originalUser = await userService.getUserById(1);
      const updatedUser = await userService.updateUser(1, { name: 'New Name' });

      expect(updatedUser?.name).toBe('New Name');
      expect(updatedUser?.email).toBe(originalUser?.email);
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', async () => {
      const deleted = await userService.deleteUser(1);

      expect(deleted).toBe(true);

      // Verify user was deleted
      const user = await userService.getUserById(1);
      expect(user).toBeNull();

      const users = await userService.getAllUsers();
      expect(users).toHaveLength(1);
    });

    it('should return false when user not found', async () => {
      const deleted = await userService.deleteUser(999);

      expect(deleted).toBe(false);
    });
  });
});
