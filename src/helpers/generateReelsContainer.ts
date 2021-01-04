import * as PIXI from "pixi.js";

import { assetsScheme, symbolSize } from "common/constants";

const generateReelsContainer = (app: PIXI.Application): PIXI.Container => {
  const reelsContainer = new PIXI.Container();

  const reelsSprite = new PIXI.Sprite(
    app.loader.resources[assetsScheme.reels].texture
  );

  reelsContainer.x = 0.25 * window.innerWidth;
  reelsContainer.y = 0.05 * window.innerHeight;
  reelsContainer.width = window.innerWidth * 0.5;
  reelsContainer.height = symbolSize * 3;

  reelsSprite.width = window.innerWidth * 0.5;
  reelsSprite.height = window.innerHeight * 0.7;

  reelsContainer.addChild(reelsSprite);

  const mask = new PIXI.Sprite(PIXI.Texture.WHITE);
  mask.width = window.innerWidth;
  mask.height = symbolSize * 3;
  reelsContainer.addChild(mask);
  reelsContainer.mask = mask;

  return reelsContainer;
};

export default generateReelsContainer;
