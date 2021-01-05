import * as PIXI from "pixi.js";

import { symbols, symbolSize } from "common/constants";
import spinResults from "./../results.json";
import { ReelContent } from "./types";

export const insertResult = (
  reelsContent: Array<ReelContent>,
  currentMachineState: number
) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      reelsContent[i].symbols[
        reelsContent[i].symbols.length - 4 * i - 1 - j // sperad results across reels to keep same spinning speed
      ].texture = PIXI.Texture.from(
        spinResults["machine-state"][currentMachineState].reels[2 - j][i] // get result symbols from columns
      );
    }
  }
};

export const buildReelsContent = (
  loader: PIXI.Loader,
  reelsContainer: PIXI.Container
) => {
  const reels: Array<ReelContent> = [];

  // columns
  for (let i = 0; i < 3; i++) {
    const reel: ReelContent = {
      symbols: [],
      position: 0,
    };

    // rows
    for (let j = 0; j < 20; j++) {
      const symbolSprite = new PIXI.Sprite(
        loader.resources[
          symbols[Math.floor(Math.random() * symbols.length)]
        ].texture
      );
      symbolSprite.height = symbolSize;
      symbolSprite.width = reelsContainer.width / 3 - 40; // align symbols at the center of reel
      symbolSprite.y = (j % 20) * symbolSize; // place symbols one by one
      symbolSprite.x = i * (symbolSprite.width + 40) + 20; // add reels whitespaces

      reel.symbols.push(symbolSprite);
      reelsContainer.addChild(symbolSprite);
    }
    reels.push(reel);
  }

  return reels;
};
