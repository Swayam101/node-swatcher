import path from "path";

import playsound from "play-sound";

import { __dirname } from "./constants.js";

const player = playsound({});

const mediaPath = path.join(__dirname, "assets", "loud.mp3");

player.play(mediaPath, (err) => {
  if (err) console.log(`Error: ${err}`);
});
