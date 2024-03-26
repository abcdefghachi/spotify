import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GetTokens from "./components/GetTokens";
import Spotify from "./components/Spotify";
import { useEffect } from "react";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      // console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return <div>{token ? <Spotify /> : <GetTokens />}</div>;

  // return (
  //   <Router>
  //     <Routes>
  //       <Route exact path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/spotify" element={<Spotify />}></Route>
  //     </Routes>
  //   </Router>
  // );
}

export default App;
