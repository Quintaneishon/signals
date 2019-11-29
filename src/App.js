import React,{Component} from 'react';
import './App.css';
import Header from './components/Header.js';

class App extends Component{
  render(){
    return <center>
      <div className="container">
      <div className="row justify-content-md-center">
      <p><h1 id="name">Quintana Ajitzi - Ortiz Alejandro - Reyes Alexis</h1></p>
      </div>
        <br/>
          <Header />  
      </div>
      </center>
  }
}

export default App;
