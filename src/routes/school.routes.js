import express from "express";
import {
  createSchool,
  listSchools,
} from "../controllers/school.controllers.js";

const router = express.Router();

router.route("/addSchool").post(createSchool);

router.get("/listSchools", listSchools);
export default router;
