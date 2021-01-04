import * as PIXI from "pixi.js";
import { useEffect } from "react";

import spinResults from "./results.json";
import { assets, assetsScheme, symbols, symbolSize } from "common/constants";

const generateReelsContainer = (app: PIXI.Application): PIXI.Container => {
  const reelsContainer = new PIXI.Container();

  const reelsSprite = new PIXI.Sprite(
    app.loader.resources[assetsScheme.reels].texture
  );

  reelsContainer.x = 0.25 * window.innerWidth;
  reelsContainer.y = 0.15 * window.innerHeight;
  reelsContainer.width = window.innerWidth * 0.5;
  reelsContainer.height = symbolSize * 3;

  reelsSprite.width = window.innerWidth * 0.5;
  reelsSprite.height = window.innerHeight * 0.7;

  reelsContainer.addChild(reelsSprite);

  const mask = new PIXI.Sprite(PIXI.Texture.WHITE);
  mask.width = window.innerWidth;
  mask.height = reelsContainer.height;
  reelsContainer.addChild(mask);
  reelsContainer.mask = mask;

  return reelsContainer;
};

const setBackground = (app: PIXI.Application): PIXI.Sprite => {
  const backgroundSprite = new PIXI.Sprite(
    app.loader.resources[assetsScheme.background].texture
  );
  backgroundSprite.width = window.innerWidth;
  backgroundSprite.height = window.innerHeight;

  return backgroundSprite;
};

const App = () => {
  const stageSize = Math.min(window.innerHeight, window.innerWidth);

  useEffect(() => {
    let startTime = 0;
    let currentMachineState = 0;
    let isRunning = false;
    let isFirstLaunch = true;

    const app = new PIXI.Application();
    app.resizeTo = window;

    app.loader.add(assets).load(setup);

    function setup() {
      //background
      const backgroundSprite = setBackground(app);
      app.stage.addChild(backgroundSprite);

      //reels
      const reelsContainer = generateReelsContainer(app);

      const reels: Array<{
        symbols: Array<PIXI.Sprite>;
        position: number;
      }> = [];
      for (let i = 0; i < 3; i++) {
        const reel: { symbols: Array<PIXI.Sprite>; position: number } = {
          symbols: [],
          position: 0,
        };
        for (let j = 0; j < 20; j++) {
          const symbolSprite = new PIXI.Sprite(
            app.loader.resources[
              symbols[Math.floor(Math.random() * symbols.length)]
            ].texture
          );
          symbolSprite.height = symbolSize;
          symbolSprite.width = reelsContainer.width / 3 - 40;
          symbolSprite.y = (j % 20) * symbolSize - symbolSize;
          symbolSprite.x = i * (symbolSprite.width + 40) + 20;

          reel.symbols.push(symbolSprite);
          reelsContainer.addChild(symbolSprite);
        }
        reels.push(reel);
      }
      const buttonSprite = new PIXI.Sprite(
        app.loader.resources[assetsScheme.buttonSpin].texture
      );

      buttonSprite.height = symbolSize;
      buttonSprite.width = symbolSize;
      buttonSprite.x = reelsContainer.width + 40;
      buttonSprite.y = symbolSize;
      buttonSprite.interactive = true;
      buttonSprite.buttonMode = true;
      buttonSprite.addListener("click", () => {
        if (isRunning) return;
        isRunning = true;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            reels[i].symbols[
              reels[i].symbols.length - 4 * i - 1 - j
            ].texture = PIXI.Texture.from(
              spinResults["machine-state"][currentMachineState].reels[2 - j][i]
            );
          }
        }

        startTime = Date.now();
      });

      reelsContainer.addChild(buttonSprite);
      app.stage.addChild(reelsContainer);

      app.ticker.add((deltaTime) => {
        console.log(currentMachineState);
        if ((Date.now() - startTime) / 1000 < 3) {
          const position = isFirstLaunch ? 24 : 20;

          for (let i = 0; i < 3; i++) {
            reels[i].position =
              (Date.now() - startTime) / 1000 < i + 1
                ? reels[i].position +
                  (position * app.ticker.elapsedMS * deltaTime) / 1000
                : reels[i].position;
            for (let j = 0; j < reels[i].symbols.length; j++) {
              const s = reels[i].symbols[j];
              s.y =
                ((reels[i].position + j) % reels[i].symbols.length) *
                  symbolSize -
                symbolSize;
            }
          }
        } else {
          if (isRunning) {
            isFirstLaunch = false;
            if (currentMachineState < spinResults["machine-state"].length - 1) {
              currentMachineState += 1;
            } else {
              currentMachineState = 0;
            }
          }
          isRunning = false;
        }
      });
    }

    document.body.appendChild(app.view);

    return () => app.destroy(true);
  }, [stageSize]);

  return null;
};

export default App;
