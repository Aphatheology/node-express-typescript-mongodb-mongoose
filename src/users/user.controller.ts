import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from 'middlewares/auth';
import userService from './user.service';

export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.register(req.body);
  res.status(StatusCodes.CREATED).send(user);
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.login(req.body);
  res.send(user);
});

export const getProfile = catchAsync(async (req: CustomRequest, res: Response): Promise<any> => {
    const user = await userService.getProfile(req.user);
    res.status(StatusCodes.OK).send(user);
});
