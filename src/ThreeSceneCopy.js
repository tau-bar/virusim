import React, { Component } from "react";
import { useState } from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import './ThreeScene.css';
import './LoadingBar.css';
import TriggersTooltips from './ToolTip';
import CustomButton from './components/custom-button/custom-button.component';



const style = {
    height: "15vh",
    width: "80vh"

};

class App extends Component {

    constructor(props) {
        super(props);
    
        console.log(this.props)
    }

    
    
    //Boilerplate code starts here 

    componentDidMount() {
        this.sceneSetup();
        this.addLights();
        this.loadTheModel();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    sceneSetup = () => {
        const width = this.mount.clientWidth / 4;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.needsUpdate = false;      
        this.camera = new THREE.PerspectiveCamera(
            30, 
            width/height, 
            2, 
            200
        );
        this.camera.position.z = 5; 
        this.controls = new OrbitControls( this.camera, this.mount );
        this.controls.minDistance=3
        this.controls.maxDistance=8
        this.controls.autoRotate=true

        this.controls.update();
        
        this.renderer = new THREE.WebGLRenderer();
        //first
        this.renderer.setSize( width *4.5 , height * 6.1) ;
        this.mount.appendChild( this.renderer.domElement );
    };

    addLights = () => {
        const lights = [];
        //color code here
        const helper = this.props.colorCode
        console.log(this.props.colorCode)

        
        const color = new THREE.Color(this.props.colorCode);
        
        lights[ 0 ] = new THREE.PointLight( color, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( color, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( color, 1, 0 );

        lights[ 0 ].position.set( 0, 2000, 0 );
        lights[ 1 ].position.set( 1000, 2000, 1000 );
        lights[ 2 ].position.set( - 1000, - 2000, - 1000 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };
            
    startAnimationLoop = () => {
        console.log("7")
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    

    /*
    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        //second
        this.renderer.setSize( width, height);
        this.camera.aspect = height;
        this.camera.updateProjectionMatrix();
    };
    */

    // Boilerplate code ends here

    //Load obj and mtl file here

    loadTheModel = () => {
        const loader = new OBJLoader();
        

        loader.load(
            /*
            '/assets/eleph.obj',
            */
            /*
            this.props.virusType,
            */
            "/assets/" + this.props.virusType + ".obj",
            ( object ) => {
                var cent = new THREE.Vector3();
                var size = new THREE.Vector3();
                var bbox = new THREE.Box3().setFromObject(object);
                bbox.getCenter(cent);
                bbox.getSize(size);

                //Rescale the object to normalized space
                var maxAxis = Math.max(size.x, size.y, size.z);
                object.scale.multiplyScalar((this.props.sizeCode / (30 * maxAxis)));
                console.log("2")

                bbox.setFromObject(object);
                bbox.getCenter(cent);
                bbox.getSize(size);
                
                object.position.x = -cent.x;
                object.position.y = -cent.y;
                object.position.z = -cent.z;

                this.scene.add( object );
                const el = this.scene.getObjectByName("Elephant_4");             
                this.model = el;
            },

          

             ( xhr ) => {
                const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
                console.log( ( loadingPercentage ) + '% loaded' );
                this.props.onProgress(loadingPercentage);
            },
             ( error ) => {

                console.log( 'An error happened:' + error );

            }
        );
    };

            
    render() {
     
        return (
            <> 
            <div style={style} ref={ref => (this.mount = ref)} />
            <div className="ToolTipPos">
            <TriggersTooltips></TriggersTooltips>
            </div>
            </>
        );
        
    }
}

class Container extends React.Component {

    constructor(props) {
        super(props);
    
        console.log(this.props.colorCode)  
        console.log(this.props.size)   
        console.log("hello")
        this.state = {
            showComponent: false,
          };
        this.state = {isOpened: false};
        this._onButtonClick = this._onButtonClick.bind(this);
        

    }

    state = {isMounted: true};

    _onButtonClick() {
        this.setState({
          showComponent: !this.state.showComponent,
        });
      }

    render() {
        console.log(this.props.sizeCode)
        const {isMounted = true, loadingPercentage = 0} = this.state;
        return (
            <>
            <div className="LoadingAnimation">
            <div>
        <CustomButton onClick={this._onButtonClick}>Click for results</CustomButton>
        {this.state.showComponent ?
           <App virusType={this.props.virusType} colorCode={this.props.colorCode} sizeCode={this.props.sizeCode} onProgress={loadingPercentage => this.setState({ loadingPercentage })} />:
           null
        }
      </div>
                {isMounted && loadingPercentage !== 100 && <div className = "LoadingBar">Loading Coronavirus: {loadingPercentage}%</div>}
            </div>   
            
        
          </>
        )
    }
}

export default Container;

/*
                {isMounted && <App colorCode={this.props.colorCode} sizeCode={this.props.sizeCode} onProgress={loadingPercentage => this.setState({ loadingPercentage })} />}

*/





