import H1 from "assets/symbols/H1.png";
import H2 from "assets/symbols/H2.png";
import H3 from "assets/symbols/H3.png";
import H4 from "assets/symbols/H4.png";
import L1 from "assets/symbols/L1.png";
import L2 from "assets/symbols/L2.png";
import L3 from "assets/symbols/L3.png";
import L4 from "assets/symbols/L4.png";
import WILD from "assets/symbols/WILD.png";
import background from "assets/background.jpg";
import buttonSpin from "assets/button_spin.png";
import reels from "assets/reels.png";

export const symbolSize = (window.innerHeight * 0.7) / 3;

export const assetsScheme = {
  background: "background",
  buttonSpin: "buttonSpin",
  reels: "reels",
};

export const symbols = ["H1", "H2", "H3", "H4", "L1", "L2", "L3", "L4", "WILD"];

export const assets = [
  { name: "background", url: background },
  { name: "buttonSpin", url: buttonSpin },
  { name: "reels", url: reels },
  { name: "H1", url: H1 },
  { name: "H2", url: H2 },
  { name: "H3", url: H3 },
  { name: "H4", url: H4 },
  { name: "L1", url: L1 },
  { name: "L2", url: L2 },
  { name: "L3", url: L3 },
  { name: "L4", url: L4 },
  { name: "WILD", url: WILD },
];
