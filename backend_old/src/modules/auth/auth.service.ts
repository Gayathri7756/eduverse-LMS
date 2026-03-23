import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export class AuthService {
  static async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, email: true, name: true, role: true }
    });
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token (hashed in production)
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken };
  }

  static async logout(token: string) {
    return prisma.refreshToken.delete({ where: { token } });
  }

  static async refresh(token: string) {
    const rt = await prisma.refreshToken.findUnique({ where: { token } });
    if (!rt || rt.expiresAt < new Date()) {
      throw { status: 401, message: 'Invalid or expired refresh token' };
    }

    const accessToken = generateAccessToken(rt.userId);
    return { accessToken };
  }
}
