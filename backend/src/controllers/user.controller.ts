import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ status: 'success', data: user });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const user = await userService.getUserProfile(id);
    res.status(200).json({ status: 'success', data: user });
  } catch (error: any) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};
