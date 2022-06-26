import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages';
import HeroSection from './components/heroSection';
import Login from './components/login/index'
import Create from './components/newAccount';
import Validate from './components/validate/index';
import Message from './components/newAccount/message';
import Reset from './components/reset/index';
import Pw from './components/reset/resetPW';
import Accueil from './components/accueil';
import Deco from './components/login/logout';

function App() {
  return (
    <Router>
      <Home />
      <Route exact path="/">
        <HeroSection /> 
      </Route>
      <Route path="/signin">
          <Login/>
      </Route>
      <Route path="/signup">
        <Create/>
      </Route>
      <Route path="/validation/:token">
        <Validate/>
      </Route>
      <Route path="/userValid">
        <Message/>
      </Route>
      <Route path="/resetPW">
        <Reset/>
      </Route>
      <Route path="/recup/:token">
        <Pw/>
      </Route>
      <Route path="/accueil">
        <Accueil/>
      </Route>
      <Route path="/logOut">
        <Deco/>
      </Route>
    </Router>
  );
}

export default App;
