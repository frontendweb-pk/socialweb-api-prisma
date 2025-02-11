import prisma from "../lib/prisma-client";

class UserService {
  // Private constructor to prevent multiple instances
  private constructor() {}

  // Static method to return the singleton instance
  private static _instance: UserService;

  // Make the instance available
  public static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }
    return UserService._instance;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        email_verified: true,
        avatar: true,
        mobile: true,
        status: true,
        user_id: true,
        role: {
          select: {
            role_name: true,
            role_id: true,
            permissions: true,
          },
        },
      },
    });
    return users;
  }

  async getLoggedInUser(user_id: number) {
    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },
      select: {
        name: true,
        email: true,
        email_verified: true,
        avatar: true,
        mobile: true,
        status: true,
        user_id: true,
        role: { select: { role_id: true, role_name: true, permissions: true } },
      },
    });

    return user;
  }

  async getLoggedInRole(user_id: number) {
    const user = await this.getLoggedInUser(user_id);
    return user?.role;
  }
}

const userService = UserService.getInstance();
export { userService };
