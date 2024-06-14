import express from "express";
import * as gameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/search", gameController.searchGames); // Search for games

export default router;
