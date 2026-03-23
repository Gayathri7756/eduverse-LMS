import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    res.json({ user: result.user, accessToken: result.accessToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await AuthService.refresh(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    await AuthService.logout(token);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
