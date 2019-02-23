import * as React from "react";
import Skeleton from "./components/Drawer";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BBMS APP</h1>
        </header>
        <div className="Box">
          <Skeleton />
        </div>
      </div>
    );
  }
}

export default App;
