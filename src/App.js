import { useEffect } from "react";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=53766df6";
function App() {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log("Movies", data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
    return;
  }, []);

  return <div className="App"></div>;
}

export default App;
