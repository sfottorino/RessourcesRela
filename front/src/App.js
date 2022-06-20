import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages';
import HeroSection from './components/heroSection';
import Login from './components/login/index'

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
    </Router>
  );
}

export default App;
