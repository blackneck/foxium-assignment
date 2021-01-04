import * as PIXI from "pixi.js";
import { useEffect, useMemo, useState } from "react";

import spinResults from "../results.json";
import { assets, miliseconds, symbolSize } from "common/constants";
import generateReelsContainer from "helpers/generateReelsContainer";
import generateButton from "helpers/generateButton";
import insertResult, { buildReelsContent } from "utils";

const usePixiApp = (): { app: PIXI.Application; winAmount: number } => {
  const [winAmount, setWinAmount] = useState(0);

  const app = useMemo(
    () =>
      new PIXI.Application({
        transparent: true,
        resizeTo: window,
        autoStart: false,
      }),
    []
  );

  useEffect(() => {
    let startTime = 0;
    let currentMachineState = 0;
    let isSpinning = false;
    let isFirstLaunch = true;

    app.loader.add(assets).load((loader) => {
      app.start();

      //reelsContent
      const reelsContainer = generateReelsContainer(app);
      const reelsContent = buildReelsContent(loader, reelsContainer);

      app.stage.addChild(reelsContainer);

      //button
      const buttonSprite = generateButton(
        app,
        reelsContainer.width + 40,
        () => {
          if (isSpinning) return;

          setWinAmount(0);
          isSpinning = true;

          //add symbols for the next result
          insertResult(reelsContent, currentMachineState);
          startTime = Date.now();
        }
      );
      reelsContainer.addChild(buttonSprite);

      app.ticker.add(() => {
        //check if the delay of 3s is passed
        if ((Date.now() - startTime) / miliseconds <= 3) {
          //how many symbols should we skip before stop (20 e.g. full reel)
          const position = isFirstLaunch ? 24 : 20;

          for (let i = 0; i < 3; i++) {
            reelsContent[i].position =
              (Date.now() - startTime) / miliseconds < i + 1
                ? reelsContent[i].position +
                  //make sure that the full spin is taking 1s
                  (position * app.ticker.elapsedMS) / miliseconds
                : //stop rotating reels one by one
                  reelsContent[i].position;
            for (let j = 0; j < reelsContent[i].symbols.length; j++) {
              //handle going off screen and looping
              reelsContent[i].symbols[j].y =
                ((reelsContent[i].position + j) %
                  reelsContent[i].symbols.length) *
                  symbolSize -
                symbolSize;
            }
          }
        } else {
          //clean up and prepare for the next spin
          if (isSpinning) {
            isFirstLaunch = false;
            startTime = 0;
            isSpinning = false;

            setWinAmount(spinResults["machine-state"][currentMachineState].win);

            if (currentMachineState < spinResults["machine-state"].length - 1) {
              currentMachineState += 1;
            } else {
              currentMachineState = 0;
            }
          }
        }
      });
    });

    return () => app.destroy();
  }, [app]);

  return { app, winAmount };
};

export default usePixiApp;
