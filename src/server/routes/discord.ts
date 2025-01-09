import { Router } from "express";
import Replay from "./../../database/models/replay";
import { client } from '../../client/core/client';
import Player from "../../database/models/player";
const router = Router();

router.route("/replay").post(async (req, res) => {
  const replay = await Replay.findOne({id: req.body.replay_id});

  await client.emit("sendReplay", replay);
  res.sendStatus(200);
});

router.route("/elo").get(async(req, res) => {
  const userid = req.query.userid;
  console.log(userid);

  const player = await Player.findOne({ showdownUsername: userid });

  if (!player) return res.send({elo: 1000});
  else return res.send({ elo: player.elo });
})

export default router;