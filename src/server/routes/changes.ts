import { Router } from "express";
import Grabbers from "../../global/grabbers";

const router = Router();

router.route("/pokemon").get(async (req, res) => {
  let pokedex = await Grabbers.getPokedex();
  let learnsets = await Grabbers.getLearnset();
  let moves = await Grabbers.getMoves();
  let basePokedex = await Grabbers.getBasePokedex();
  let baseLearnsets = await Grabbers.getBaseLearnset();
  let baseMoves = await Grabbers.getBaseMove();

  return res.render('pokemon.pug', {
    pokedex,
    learnsets,
    moves,
    basePokedex,
    baseLearnsets,
    baseMoves,
  })
});

export default router;