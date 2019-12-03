import React,{Component} from 'react'
import p5 from "p5";
import "p5/lib/addons/p5.sound";

class Micro extends Component{
    state = {
        activo: false,
        sound: null,
        diez: 2.5,
        inter: 0.5,
        ampli:0.1,
        loop: false
    }

    startRecording = () => {
        let context
        let soundFile
        let mic = new p5.AudioIn();
        // users must manually enable their browser microphone for recording to work properly!
        mic.start();
        // create a sound recorder
        let recorder = new p5.SoundRecorder();
        // connect the mic to the recorder
        recorder.setInput(mic);
        // create an empty sound file that we will use to playback the recording
        soundFile = new p5.SoundFile();
        context = new (window.AudioContext || window.webkitAudioContext)();
        context.resume().then(() => {
            recorder.record(soundFile, 5, ()=>{
                alert('Se acabo de grabar');
                this.setState({sound: soundFile})
            });
            console.log('Playback resumed successfully');
        });
        console.log(soundFile)
        if(soundFile)
            console.log('assa')
        else
            alert('No se puede grabar aun');
    }

    playRecording = () => {
        this.state.sound.rate(1);
        this.state.sound.setVolume(this.state.ampli);
	    this.state.sound.play();
    }

    diezma = () => {
        this.state.sound.rate(this.state.diez);
        this.state.sound.play();
    }

    interpola = () => {
        this.state.sound.rate(this.state.inter);
        this.state.sound.play();
    }

    desplaza = () => {
        this.setState({loop: !this.state.loop})
        console.log(this.state)
        this.state.sound.rate(1);
        this.state.sound.play();
        this.state.sound.setLoop(this.state.loop)
    }

    reflejo = () => {
        this.state.sound.rate(-1);
	    this.state.sound.play();
    }
    
    onChange = e => {
        console.log(e.target.value)
        this.setState({
            [e.target.name] : Number(e.target.value)
        })
        console.log(this.state)
    }

    render(){
        return <div>
                <div className="row justify-content-md-center">
                <div className="col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 my-1">
                            <button className="btn btn-primary" onClick={this.startRecording}>
                                GRABAR <br></br><i style={{fontSize : '80px'}} className="fa fa-microphone"></i>
                            </button>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <button className="btn btn-primary" id="audio" onClick={this.playRecording}>
                                PLAY <br></br><i style={{fontSize : '80px'}} className="fa fa-play"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h5>Diezmación</h5>
                        <input type="range" id="diez" name="diez" min="1" value={this.state.diez} max="4" step="0.1" onChange={this.onChange}></input>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h5>Interpolación</h5>
                        <input type="range" id="inter" name="inter" value={this.state.inter} min="0.1" max="1" step="0.1" onChange={this.onChange}></input>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h5>Amplificación</h5>
                        <input type="range" id="ampli" name="ampli" value={this.state.ampli} min="0.1" max="1" step="0.1" onChange={this.onChange}></input>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 my-2">
                    <button className="btn btn-primary" 
                        onClick={this.reflejo}
                        style={{margin: 1}}
                    >
                        REFLEJO <br></br>
                        <i style={{fontSize : '20px'}} 
                        className="fa fa-random"></i>
                    </button>&nbsp;
                    <button className="btn btn-primary" 
                        onClick={this.desplaza}
                        style={{margin: 1}}
                    >
                        DESPLAZAMIENTO <br></br>
                        <i style={{fontSize : '20px'}} 
                        className="fa fa-arrows-h"></i>
                    </button>&nbsp;
                    <button className="btn btn-primary" 
                        onClick={this.interpola}
                        style={{margin: 1}}
                    >
                        INTERPOLACIÓN <br></br>
                        <i style={{fontSize : '20px'}} 
                        className="fa fa-arrows-v"></i>
                    </button>&nbsp;
                    <button className="btn btn-primary" 
                        onClick={this.diezma}
                        style={{margin: 1}}
                    >
                        DIEZMACIÓN <br></br>
                        <i style={{fontSize : '20px'}} 
                        className="fa fa-sort-amount-desc"></i>
                    </button>
                </div>
                </div>
            </div>
    }
}

export default Micro