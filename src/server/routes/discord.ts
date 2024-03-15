import { Router } from "express";
import Replay from "./../../database/models/replay";
import { client } from '../../client/core/client';
const router = Router();

router.route("/replay").post(async (req, res) => {
  const replay = await Replay.findOne({id: req.body.replay_id});

  await client.emit("sendReplay", replay);
  res.sendStatus(200);
});

export default router;