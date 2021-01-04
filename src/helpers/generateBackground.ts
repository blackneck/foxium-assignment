import * as PIXI from "pixi.js";

import { assetsScheme } from "common/constants";

const generateBackground = (app: PIXI.Application): PIXI.Sprite => {
  const backgroundSprite = new PIXI.Sprite(
    app.loader.resources[assetsScheme.background].texture
  );
  backgroundSprite.width = window.innerWidth;
  backgroundSprite.height = window.innerHeight;

  return backgroundSprite;
};

export default generateBackground;
