import * as PIXI from "pixi.js";
import { useEffect } from "react";

import spinResults from "./results.json";
import { assets, symbolSize } from "common/constants";
import generateBackground from "helpers/generateBackground";
import generateReelsContainer from "helpers/generateReelsContainer";
import generateButton from "helpers/generateButton";
import insertResult, { buildReelsContent } from "utils";

const App = () => {
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
      const backgroundSprite = generateBackground(app);
      app.stage.addChild(backgroundSprite);

      //reelsContent
      const reelsContainer = generateReelsContainer(app);
      const reelsContent = buildReelsContent(app, reelsContainer);
      app.stage.addChild(reelsContainer);

      //button
      const buttonSprite = generateButton(
        app,
        reelsContainer.width + 40,
        () => {
          if (isRunning) return;

          isRunning = true;
          insertResult(reelsContent, currentMachineState);
          startTime = Date.now();
        }
      );
      reelsContainer.addChild(buttonSprite);

      app.ticker.add((deltaTime) => {
        if ((Date.now() - startTime) / 1000 < 3) {
          const position = isFirstLaunch ? 24 : 20;

          for (let i = 0; i < 3; i++) {
            reelsContent[i].position =
              (Date.now() - startTime) / 1000 < i + 1
                ? reelsContent[i].position +
                  (position * app.ticker.elapsedMS * deltaTime) / 1000
                : reelsContent[i].position;
            for (let j = 0; j < reelsContent[i].symbols.length; j++) {
              const s = reelsContent[i].symbols[j];
              s.y =
                ((reelsContent[i].position + j) %
                  reelsContent[i].symbols.length) *
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
  }, []);

  return null;
};

export default App;
