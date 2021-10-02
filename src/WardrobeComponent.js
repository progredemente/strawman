import React, { Component } from 'react';
import './WardrobeComponent.css';
import i18n from './i18n.json';
import GarmentComponent from './GarmentComponent';

class WardrobeComponent extends Component{

    render() {
        return (
            <div className="wardrobe">
                {
                    Object.keys(this.props.wardrobe).map((category) => {
                        return (
                            <div className="category" key={category}>
                                <span>{i18n[category][this.props.lang]}</span>
                                <div className="content">
                                    {
                                        Object.keys(this.props.wardrobe[category]).map((garmentName) => {
                                            return (
                                                <GarmentComponent
                                                    key={garmentName}
                                                    garment={this.props.wardrobe[category][garmentName]}
                                                    selectGarment={this.props.selectGarment}
                                                    lang={this.props.lang}
                                                ></GarmentComponent>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default WardrobeComponent;
