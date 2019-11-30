import React,{Component} from 'react';
import Plot from 'react-plotly.js';
const Sequence = require('../sequence.js')

class Ingresa extends Component{
    state = {
        fn : '',
        gn : '',
        fnP : false,
        gnP : false,
        res : false,
        circular: false,
        periodica: false
    }
    
    finita = () => {
        this.setState({
            res: true,
            fnP : false,
            gnP : false,
            circular: false,
            periodica: false  
        })
    }

    circular = () => {
        this.setState({
            res: true,
            fnP: false,
            gnP: false,
            circular: true,
            periodica: false  
        })
    }

    periodica = () =>{
        this.setState({
            res: true,
            fnP: true,
            gnP: false,
            circular: false,
            periodica: true
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value,
            res: false
        })
    }

    render(){
        let result = null
        let result2 = null
        if ( this.state.res ) {
            let fn= this.state.fn;
            let gn= this.state.gn;
            let fnP= this.state.fnP;
            let gnP= this.state.gnP;

            // let gn = document.getElementById('gn').value;
            // let fnP = (document.getElementById('fnP').checked)? true:false;
            // let gnP = (document.getElementById('gnP').checked)? true:false;

            let S1 = new Sequence(fn, fnP);
            let S2 = new Sequence(gn, gnP);
            console.log(S1)
            console.log(S2)
            // try{
                let res = S1.conSequence(S2)
                if(this.state.circular){
                    if(S1.getLength >= S2.getLength){
                        let res1Num = []
                        let res2Num = []
                        let result = []
                        let superRes = res.getString.substring(1,res.getString.length-1).split(' ')
                        let resNum = superRes.map((s) => {
                            if(s.split('(').length > 1)
                                return Number(s.split('(')[1].split(')')[0])
                            return s = Number(s)
                        })
                        const elCero = superRes.findIndex((s,index) => s.includes('('))
                        for (let i = 0; i < S1.getLength; i++) {
                            res1Num.push(resNum[i])
                        }
                        for (let i = S1.getLength; i < S1.getLength + S1.getLength; i++) {
                            if(resNum[i] === undefined)
                                res2Num.push(0)
                            else
                                res2Num.push(resNum[i])
                        }
                        for (let i = 0; i < S1.getLength; i++) {
                            result.push(res1Num[i]+res2Num[i])
                        }
                        if(result.length-1 < elCero){
                            let cuantos = elCero - (result.length-1)
                            for(let i=0; i<cuantos; i++){
                                result.push(result[i])
                            }
                        }
                        let resultString = '{'
                        result.forEach((r,index) => {
                            if(index === elCero)
                                resultString += '('+r+') '
                            else
                                resultString += r+' '
                        })
                        
                        resultString = resultString.substring(0,resultString.length-1)
                        resultString += '}'
                        res = new Sequence(resultString,true)
                    }else{
                        let res1Num = []
                        let res2Num = []
                        let result = []
                        let superRes = res.getString.substring(1,res.getString.length-1).split(' ')
                        let resNum = superRes.map((s) => {
                            if(s.split('(').length > 1)
                                return Number(s.split('(')[1].split(')')[0])
                            return s = Number(s)
                        })
                        const elCero = superRes.findIndex((s,index) => s.includes('('))
                        for (let i = 0; i < S2.getLength; i++) {
                            res1Num.push(resNum[i])
                        }
                        for (let i = S2.getLength; i < S2.getLength + S2.getLength; i++) {
                            if(resNum[i] === undefined)
                                res2Num.push(0)
                            else
                                res2Num.push(resNum[i])
                        }
                        for (let i = 0; i < S2.getLength; i++) {
                            result.push(res1Num[i]+res2Num[i])
                        }
                        if(result.length-1 < elCero){
                            let cuantos = elCero - (result.length-1)
                            for(let i=0; i<cuantos; i++){
                                result.push(result[i])
                            }
                        }
                        let resultString = '{'
                        result.forEach((r,index) => {
                            if(index === elCero)
                                resultString += '('+r+') '
                            else
                                resultString += r+' '
                        })
                        
                        resultString = resultString.substring(0,resultString.length-1)
                        resultString += '}'
                        res = new Sequence(resultString,true)
                    }
                }
                if(this.state.periodica){

                }
                var trace1 = {
                    x: Object.keys(S1.sequence),
                    y: Object.values(S1.sequence),
                    mode: 'markers',
                    name: 'fn',
                    type: 'scatter'
                };
                    
                var trace2 = {
                        x: Object.keys(S2.sequence),
                        y: Object.values(S2.sequence),
                        mode: 'markers',
                        name: 'gn',
                        type: 'scatter',
                        marker: { size: 12 }
                    };	  		  
                
                var trace3 = {
                    x: Object.keys(res.sequence),
                    y: Object.values(res.sequence),
                    mode: 'markers',
                    name: 'res',
                    type: 'scatter',
                    marker: { size: 12 }
                };
                
                
                var data = [trace1, trace2, trace3];
                var lay = {
                    shapes: []
                }
                for (let index = 0; index < trace3.x.length; index++) {
                    lay.shapes.push({
                        type: 'line',
                        x0: trace3.x[index],
                        y0: 0,
                        x1: trace3.x[index],
                        y1: trace3.y[index],
                        line: {
                            color: 'rgb(255, 128, 191)',
                            width: 3
                        }
                    })
                }
                for (let index = 0; index < trace1.x.length; index++) {
                    lay.shapes.push({
                        type: 'line',
                        x0: trace1.x[index],
                        y0: 0,
                        x1: trace1.x[index],
                        y1: trace1.y[index],
                        line: {
                            color: 'rgb(55, 128, 191)',
                            width: 3
                        }
                    })
                }
                    for (let index = 0; index < trace2.x.length; index++) {
                        lay.shapes.push({
                            type: 'line',
                            x0: trace2.x[index],
                            y0: 0,
                            x1: trace2.x[index],
                            y1: trace2.y[index],
                            line: {
                                color: 'rgb(55, 128, 191)',
                                width: 3
                            }
                        })
                    }

                result = (
                <div>
                    <Plot
                    data={data}
                    layout={ lay }
                    />
                </div>
                )

                result2 = (
                    <h2>
                    {res.getString}
                    </h2>
                )
            // }catch(error){
            //     alert('error al ingresar los datos')
            //     result = null
            //     result2 = null
            // }
       }

        return <div>
        <div className="row">
        <div className="col-md-12 col-sm-12 my-5">
        <h1>Ingrese el conjunto de valores discretos</h1>
        </div>
        <div className="col-md-6 col-sm-12">
        <div className="mb-3">

            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">fn</span>
                        </div>
                        <input type="text" onChange={this.onChange} id="fn" name="fn" className="form-control" placeholder="Ej = {1 2 3 4 (5) 6 7 8 9} sera periodica cuando se necesite"></input>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">gn</span>
                        </div>
                        <input type="text" onChange={this.onChange} id="gn" name="gn" className="form-control" placeholder="Ej = {1 2 3 4 (5) 6 7 8 9}"></input>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-6 col-sm-12">
            <button className="btn btn-primary" 
                onClick={this.finita}
            >
                FINITA <br></br>
                <i style={{fontSize : '20px'}} 
                className="fa fa-puzzle-piece"></i>
            </button>&nbsp;
            <button className="btn btn-primary" 
                onClick={this.periodica}
            >
                PERIODICA <br></br>
                <i style={{fontSize : '20px'}} 
                className="fa fa-repeat"></i>
            </button>&nbsp;
            <button className="btn btn-primary" 
                onClick={this.circular}
            >
                CIRCULAR <br></br>
                <i style={{fontSize : '20px'}} 
                className="fa fa-circle"></i>
            </button>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 col-sm-12">
        {result2}
        </div>
        <div className="col-md-12 col-sm-12">
        {result}
        </div>
        </div>
    </div>
    }
}

export default Ingresa;