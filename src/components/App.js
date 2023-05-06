import AppRouter from "./AppRouter";
import { useState, useEffect } from "react";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading...."}
      <footer>&copy; {new Date().getFullYear()} TwitterClone </footer>
    </div>
  );
}

export default App;
