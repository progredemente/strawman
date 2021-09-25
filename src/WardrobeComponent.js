import React, { Component } from 'react';
import GarmentComponent from './GarmentComponent';
import Garment from './Garment';
import './WardrobeComponent.css'

class WardrobeComponent extends Component{

    render() {
        return (
            <div className="wardrobe">
                {
                    Object.keys(this.props.wardrobe).map((garmentName, i) => {
                        if(this.props.wardrobe[garmentName] instanceof Garment){
                            return (
                                <GarmentComponent
                                    key={i}
                                    wardrobeSection={this.props.wardrobe}
                                    garment={this.props.wardrobe[garmentName]}
                                    selectGarment={this.props.selectGarment}
                                ></GarmentComponent>
                            )
                        }
                        else {
                            return (
                                <div
                                    key={i}
                                >
                                    <div className="drawer-header">
                                        {garmentName}
                                    </div>
                                    <div className="drawer-content">
                                        <WardrobeComponent
                                            wardrobe={this.props.wardrobe[garmentName]}
                                            selectGarment={this.props.selectGarment}
                                        ></WardrobeComponent>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        );
    }
}

export default WardrobeComponent;
