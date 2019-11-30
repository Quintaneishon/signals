import React,{Component} from 'react';
import Ingresa from './Ingresa';
import Micro from './Micro';

class Header extends Component{
    state = {
        inicio: true,
        micro: false
    }

    render(){
        if (this.state.inicio){
            return <div className="row justify-content-md-center">
                    <div className="col-md-12 col-sm-12">
                        <h1>Como deseas ingresar los datos?</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 my-3">
                        <button className="btn btn-primary" onClick={() => this.setState({inicio: false,micro:true})}>
                            MICROFONO <br></br><i style={{fontSize : '80px'}} className="fa fa-microphone"></i>
                        </button>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <button className="btn btn-primary" onClick={() => this.setState({inicio: false,micro:false})}>
                            INGRESARLOS <br></br><i style={{fontSize : '80px'}} className="fa fa-pencil"></i>
                        </button>
                    </div>
                </div>
        }else{
            if(this.state.micro){
                return <Micro />
            }else{
                return <Ingresa />
            }
        }
    }
}
  
export default Header;

