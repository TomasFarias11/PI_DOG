import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import Details from './components/DogDetails.jsx';
import DogCreated from './components/DogCreated';
import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {LandingPage}></Route>
          <Route exact path = '/dogs' component = {Home}></Route>
          <Route exact path = '/dogs/:id' render = {({match}) => <Details props={match.params.id}/>}></Route>
          <Route exact path = '/dog' component = {DogCreated}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
