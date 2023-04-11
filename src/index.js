import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Form from "./Form";
import Review from "./Review";
import Result from "./Result";
import Header from "./Header";
import "./styles.css";

createStore({
  data: {}
});

function App() {
  return (
    <StateMachineProvider>
      <Header />

      <Router>
        <Route exact path="/" component={Form} />
        <Route path="/review" component={Review} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
