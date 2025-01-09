import express from "express";
import { Config } from "../global/config";
import discordRouter from "./routes/discord";
import changeRouter from "./routes/changes";
import path from "path";
import bodyParser from "body-parser";
const app = express();

try {
  app.use(express.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/discord", discordRouter);
  app.use("/changes", changeRouter);

  // Express settings
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "views/pages"));

  app.get("/", (req, res) => {
    res.render("index", {
      title: "TTC | Home",
      message: "Hello"
    })
  });

  app.listen(Config.WEB_SERVER_PORT, async () => {
    console.log(`Web Server is ready to serve!`);
    console.log(`Listening on port ${Config.WEB_SERVER_PORT}`);
  });
} catch (error) {
  console.log(error);
}
