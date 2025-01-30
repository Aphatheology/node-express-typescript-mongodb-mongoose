import ApiError from "../utils/ApiError";
import Users, { IUser, RolesEnum } from "./user.model";
import { StatusCodes } from 'http-status-codes';

const isEmailTaken = async (email: string): Promise<boolean> => {
  const user = await Users.findOne({ email });
  return !!user;
};

const register = async (userBody: Record<string, any>): Promise<{ user: IUser; token: string }> => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email already taken");
  }

  const user = await Users.create(userBody);
  const role = userBody?.role;

  const token = await user.createJWT();
  return { user, token };
};

const login = async (userBody: { email: string; password: string }): Promise<{ user: IUser; token: string }> => {
  const user = await Users.findOne({ email: userBody.email }).select(
    "+password"
  );

  if (
    !user ||
    !(await user.comparePassword(userBody.password, user.password))
  ) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Incorrect email or password"
    );
  }
  const token = await user.createJWT();

  return { user, token };
};

/**
 * Get all jobs for the logged in employer
 * @param {IUser} user
 * @returns {Promise<IUser>}
 */
const getProfile = async (user: IUser | undefined): Promise<IUser> => {
  const userProfile = await Users.findOne({ _id: user?.id });

  if (!userProfile) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return userProfile;
};

export default {
  register,
  login,
  getProfile,
};
