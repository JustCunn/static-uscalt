import './App.css';
import {React, Fragment, useState } from 'react';
import Cover from "./components/cover.js";
import Developers from "./components/developers.js";
import About from "./components/about/about.js";
import Login from "./components/login/login.js";
import Dashboard from "./components/dashboard/dashboard.js";
import useToken from './components/useToken.js';
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom";

function App() {
  const { token, setToken } = useToken();
  const [darkMode, setDarkMode] = useState(false);
  const history = useHistory();

  const handleDMClick = () => {
    setDarkMode(!darkMode)
    console.log(darkMode)
  }

  const bg = {
    backgroundColor: darkMode ? 'black' : 'white',
    transition: 'all 0.6s ease-in-out'
  }
  return (
    <>
    <div style={bg}>
      <Router>
            <Route path="/" exact component={Cover}/>
            <Route path="/developers" exact component={Developers}/>
            <Route path="/about" exact component={About}/>
            {/*<Route path="/signin" exact component={Login}/>*/}
            <Route path="/dashboard/" render={(props) => (<Dashboard {...props} isAuthed={!token} history={history}
            onClick={handleDMClick} darkMode={darkMode} setToken={setToken}/>)}/>
      </Router>
      </div>
    </>
  );
}

export default App;
