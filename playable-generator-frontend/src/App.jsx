import Generator from "./components/Generator";
import Login from "./components/Login";
import "./css/App.css";
import "./css/Areas.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <div className="Container">
        {user ? <Generator user={user} setUser={setUser} /> : <Login setUser={setUser} />}
      </div>
    </>
  );
}

export default App;
