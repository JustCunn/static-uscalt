import './App.css';
import {React, Fragment} from 'react';
import Header from './components/head.js';
import Cover from "./components/cover.js";
import Info from "./components/register.js";
import Footer from "./components/footer.js";
import Developers from "./components/developers.js";
import About from "./components/about/about.js";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
            <Header/>
            <Route path="/" exact component={Cover}/>
            <Route path="/" exact component={Info}/>
            <Route path="/developers" exact component={Developers}/>
            <Route path="/about" exact component={About}/>
            <Footer/>
      </Router>
    </>
  );
}

export default App;
