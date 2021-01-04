import * as PIXI from "pixi.js";

import { assetsScheme, symbolSize } from "common/constants";

const generateButton = (
  app: PIXI.Application,
  x: number,
  clickListener: () => void
): PIXI.Sprite => {
  const buttonSprite = new PIXI.Sprite(
    app.loader.resources[assetsScheme.buttonSpin].texture
  );

  buttonSprite.height = symbolSize;
  buttonSprite.width = symbolSize;
  buttonSprite.x = x;
  buttonSprite.y = symbolSize;
  buttonSprite.interactive = true;
  buttonSprite.buttonMode = true;

  buttonSprite.addListener("click", clickListener);

  return buttonSprite;
};

export default generateButton;
