import express from "express";
import { ProfileController } from "./profile.controller";

const router = express.Router();

router.get("/", ProfileController.getProfileData);

export const ProfileRoutes = router;
