import { useEffect } from "react";

import usePixiApp from "hooks/usePixiApp";
import "./styles.css";

const App = () => {
  const { app, winAmount } = usePixiApp();

  useEffect(() => {
    document.body.appendChild(app.view);
  }, [app]);

  return (
    <div className="counter">
      <span className="counter-text">Win:</span>
      <span className="counter-text">USD {winAmount}</span>
    </div>
  );
};

export default App;
