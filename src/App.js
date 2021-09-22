import React, { Component } from 'react';
import './App.css';
import CanvasComponent from './CanvasComponent';
import Wardrobe from './Wardrobe';
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
                <CanvasComponent
                    wardrobe={this.state.wardrobe}
                    strawman={new ImageCropping(merge.strawman)}
                ></CanvasComponent>
                <Wardrobe
                    wardrobe={this.state.wardrobe}
                    selectGarment={this.selectGarment}
                ></Wardrobe>
            </div>
        );
    }
}

export default App;
