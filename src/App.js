import React, { Component } from 'react';
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
        let lang = 'en'
        try{
            lang = navigator.language.toLowerCase().split('-')[0];
        } catch(_){}
        if(!['en', 'es'].includes(lang)){
            lang = 'en';
        }
        this.state = {
            wardrobe: this.getWardrobe(merge, config),
            lang: lang
        }
    }

    getWardrobe(clothesOrigin, clothesDestination){
        let wardrobe = {};
        for(let categoryName in clothesOrigin){
            if(categoryName !== "strawman"){
                wardrobe[categoryName] = {};
                for(let garmentName in clothesOrigin[categoryName]) {
                    console.log(garmentName);
                    wardrobe[categoryName][garmentName] = new Garment(
                        garmentName,
                        wardrobe[categoryName],
                        clothesOrigin[categoryName][garmentName],
                        clothesDestination[categoryName]
                    );
                }
            }
        }
        return wardrobe;
    }

    selectGarment = (selectedGarment) => {
        if(!selectedGarment.selected){
            for(let garmentName in selectedGarment.category){
                let garment = selectedGarment.category[garmentName];
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
                    lang={this.state.lang}
                ></CanvasComponent>
                <WardrobeComponent
                    wardrobe={this.state.wardrobe}
                    selectGarment={this.selectGarment}
                    lang={this.state.lang}
                ></WardrobeComponent>
            </div>
        );
    }
}

export default App;
