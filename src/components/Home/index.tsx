import { useEffect } from "react";

import useGameApi from "hooks/useGameApi";
import LoadingScreen from "components/LoadingScreen";
import "./styles.css";

const App = () => {
  const { app, winAmount, isLoading } = useGameApi();

  useEffect(() => {
    if (!isLoading) {
      document.body.appendChild(app.view);
    }
  }, [app, isLoading]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="counter">
      <span className="counter-text">Win:</span>
      <span className="counter-text">USD {winAmount}</span>
    </div>
  );
};

export default App;
