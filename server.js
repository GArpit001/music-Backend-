import express from "express";
import connectCloudinery from "./cloudinary.js";
// import upload from "./middleware/multer.js";
// import { SONG } from "./models/songModel.js";
import { v2 as cloudinery } from "cloudinary";
import connectDataBase from "./config/db.js";
import cors from "cors";
import "dotenv/config";
import router1 from "./router/songRouter.js";
import router2 from "./router/albumRouter.js";
import cluster from "cluster";
import os from "os";

const CPU = os.cpus().length;
// console.log(CPU);


if (cluster.isPrimary) {
  for (let i = 0; i < CPU; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  // SUPPORT PORT
  const port = process.env.PORT || 4000;

  // DataBase
  connectDataBase();
  connectCloudinery();

  // middleware
  app.use(express.json());
  app.use(cors());

  //  All routes

  // SONG ROUTES

  app.use("/hello", router1);
  app.use("/api/song", router1);

  // ALBUM ROUTES

  app.use("/hello2", router2);
  app.use("/api/album", router2);

  // CALL THE SERVER
  app.listen(port, () => {
    console.log("Server listening on port no. " + port);
  });
}
