import express, { Router } from "express";
import validate from "../middlewares/validate";
import * as userValidation from "./user.validation";
import * as userController from "./user.controller";
import auth from '../middlewares/auth';

const router: Router = express.Router();

router
  .route("/")
  .get(auth(), userController.getProfile);

export default router;
