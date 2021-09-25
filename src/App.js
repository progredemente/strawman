import React, { Component, createRef } from 'react';
import './App.css';
import CanvasComponent from './CanvasComponent';
import WardrobeComponent from './WardrobeComponent';
import merge from './merge.json';
import config from './config.json';
import Garment from './Garment';
import ImageCropping from './ImageCropping';

class App extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            wardrobe: this.getWardrobe(merge, config)
        }
        this.canvasRef = createRef();
    }

    getWardrobe(clothesOrigin, clothesDestination){
        let wardrobe = {};
        for(let garmentName in clothesOrigin){
            if(garmentName !== "strawman"){
                if("x" in clothesOrigin[garmentName]){
                    wardrobe[garmentName] = new Garment(garmentName, wardrobe, clothesOrigin[garmentName], clothesDestination);
                }
                else {
                    wardrobe[garmentName] = this.getWardrobe(clothesOrigin[garmentName],clothesDestination[garmentName]);
                }
            }
        }
        return wardrobe;
    }

    selectGarment = (selectedGarment) => {
        if(!selectedGarment.selected){
            for(let garmentName in selectedGarment.wardrobeSection){
                let garment = selectedGarment.wardrobeSection[garmentName];
                if(garment !== selectedGarment){
                    garment.selected = false;
                }
            }
        }
        selectedGarment.selected = !selectedGarment.selected;
        this.setState({});
    }

    render() {
        return (
            <div className="app">
                <div>
                    <CanvasComponent
                        wardrobe={this.state.wardrobe}
                        strawman={new ImageCropping(merge.strawman)}
                        ref={this.canvasRef}
                    ></CanvasComponent>
                    <button onClick={() => {
                        this.canvasRef.current.downloadImage();
                    }}>Download</button>
                </div>
                <WardrobeComponent
                    wardrobe={this.state.wardrobe}
                    selectGarment={this.selectGarment}
                ></WardrobeComponent>
            </div>
        );
    }
}

export default App;
