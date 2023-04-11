import './App.css';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home/Home";
import Detail from './components/Detail/Detail';
import CFF from './components/CreateFoodForm/CFF';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><Landing/></Route>
          <Route exact path="/home"><Home/></Route>
          <Route exact path="/detail/:id/:local"><Detail/></Route>
          <Route exact path="/CreateRecipe"><CFF/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
