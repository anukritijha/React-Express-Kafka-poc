import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC<any> = () => {
  const callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
console.log
    return body;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input type="submit" value="Submit" onChange={() => callApi()} />
      </header>
    </div>
  );
};

export default App;
