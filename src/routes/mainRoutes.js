import { Router } from "express";
import isLoggedIn from "../middleware/isLoggedIn";
import { RegisterUser, LoginUser } from "../controllers/authController";
import {
  getDash,
  disableUser,
  enableUser,
  checkAdmin,
} from "../controllers/dashController";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.get("/dashboard", isLoggedIn, getDash);
router.put("/disable/:id", isLoggedIn, disableUser);
router.put("/enable/:id", isLoggedIn, enableUser);
router.get("/checkadmin", isLoggedIn, checkAdmin);

export default router;
