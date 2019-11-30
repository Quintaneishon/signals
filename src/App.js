import React,{Component} from 'react';
import './App.css';
import Header from './components/Header.js';

class App extends Component{
  render(){
    return <div><div className="col-md-12 col-sm-12">
    <h1 id="name">Quintana Ajitzi - Ortiz Alejandro - Reyes Alexis</h1>
  </div>
    <center>
      <div className="container">
      <div className="row justify-content-md-center">
      </div>
        <br/>
          <Header />  
      </div>
      </center></div>
  }
}

export default App;
