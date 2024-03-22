import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useEffect } from "react";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, []);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}

export default App;
