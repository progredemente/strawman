import React, { Component } from 'react';
import './App.css';
import CanvasComponent from './CanvasComponent';
import WardrobeComponent from './WardrobeComponent';
import merge from './merge.json';
import config from './config.json';
import Garment from './Garment';
import ImageCropping from './ImageCropping';
import i18n from './i18n.json';
import { AppsBar } from 'components/AppsBar';


class App extends Component{
    
    constructor(props){
        super(props);
        let lang;
        try{
            lang = navigator.language.toLowerCase().split('-')[0];
        } catch(_){}
        if(!['en', 'es'].includes(lang)){
            lang = 'en';
        }
        this.state = {
            wardrobe: this.getWardrobe(merge, config),
            lang: lang,
            loaded: false
        }
    }

    componentDidMount() {
        this.img = new Image();
        this.img.src = './merge.png';
        this.img.onload = () => {
            this.setState({ loaded: true });
        }
    }

    joinCategories(wardrobe, keep, del) {
        wardrobe[keep] = { ...wardrobe[keep], ...wardrobe[del] };
        delete wardrobe[del];
        for(let garmentName in wardrobe[keep]){
            wardrobe[keep][garmentName].category = wardrobe[keep];
        }
    }

    getWardrobe(clothesOrigin, clothesDestination){
        let wardrobe = {};
        for(let categoryName in clothesOrigin){
            if(categoryName !== "strawman"){
                wardrobe[categoryName] = {};
                for(let garmentName in clothesOrigin[categoryName]) {
                    wardrobe[categoryName][garmentName] = new Garment(
                        garmentName,
                        wardrobe[categoryName],
                        clothesOrigin[categoryName][garmentName],
                        clothesDestination[categoryName]
                    );
                }
            }
        }
        this.joinCategories(wardrobe, 'head', 'head2');
        console.log(wardrobe);
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
            <AppsBar current="strawman">
            {
                this.state.loaded &&
                <div className="app">
                    <CanvasComponent
                        wardrobe={this.state.wardrobe}
                        strawman={new ImageCropping(merge.strawman)}
                        lang={this.state.lang}
                        img={this.img}
                    />
                    <WardrobeComponent
                        wardrobe={this.state.wardrobe}
                        selectGarment={this.selectGarment}
                        lang={this.state.lang}
                    />
                </div>
                }
                {
                    !this.state.loaded &&
                    <div className="loading">
                        <img src={`${process.env.RESOURCES_URL}/strawman.png`} alt={i18n["loading"][this.state.lang]} />
                        {i18n["loading"][this.state.lang]}
                    </div>
                }
            </AppsBar>
        );
    }
}

export default App;
