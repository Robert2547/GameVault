import express from "express";
import * as gameController from "../controllers/gameController.js";
import addHeaders from "../middleware/addHeaders.js";

const router = express.Router();

router.post("/search", addHeaders, gameController.searchGames); //  (search for games by search query)

router.post("/artwork/:id", addHeaders, gameController.artWorkByID); //  (get covert art of games by game ID)

router.post("/:id", addHeaders, gameController.gameByID); // (get video of games by game ID)

router.post("/genres/:id", addHeaders, gameController.genresByID); //  (get all genres of games by genre ID)

export default router;
