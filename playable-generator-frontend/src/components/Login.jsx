import { useState } from "react";
import TextInput from "./TextInput";
import server from '../services/server'

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const login = (event) => {
    event.preventDefault()
    setBusy(true);
    server.login(username, password).then(user => {
        setBusy(false);
        console.log(user)
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }).catch(e => {
      setBusy(false);
    })
  }

  return (
    <div>
      <div className="Header">Login</div>
      <form onSubmit={login} className="MiniContainer">
        <div className="ContentArea">
          <TextInput
            name={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            req={true}
          />

          <TextInput
            name={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            req={true}
            password={true}
          />
        </div>
        <div className="row text-center margin-top-l">
          <button disabled={busy} className="SubmitButton" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
