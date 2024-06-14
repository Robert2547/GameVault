import express from "express";
import * as gameController from "../controllers/gameController.js";
import addHeaders from "../middleware/addHeaders.js";

const router = express.Router();

router.post("/search", addHeaders, gameController.searchGames); // POST /api/games/search (search for games by search query)

router.post("/artwork/:id", addHeaders, gameController.artWorkByID); // GET /api/games/artwork/:id (get covert art of games by game ID)

export default router;
