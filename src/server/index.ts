import express from "express";
import { Config } from "../global/config";
import discordRouter from "./routes/discord";
import path from "path";
const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/discord", discordRouter);

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
