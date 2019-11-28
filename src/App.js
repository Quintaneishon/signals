import React,{Component} from 'react';
import './App.css';
import Header from './components/Header.js';

class App extends Component{
  render(){
    return <center>
      <div className="container">
        <br/>
          <Header />  
      </div>
      </center>
  }
}

export default App;
