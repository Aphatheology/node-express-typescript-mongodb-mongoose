import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User, { IUser } from "../users/user.model";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

export interface CustomRequest extends Request {
  user?: IUser;
  token?: string
}

const auth = (roles?: string[]) => async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Please authenticate");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, otherId: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Please authenticate");
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Access denied");
    }

    user.otherId = decoded.otherId;

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
