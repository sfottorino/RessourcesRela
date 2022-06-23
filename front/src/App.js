import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages';
import HeroSection from './components/heroSection';
import Login from './components/login/index'
import Create from './components/newAccount';

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
    </Router>
  );
}

export default App;
