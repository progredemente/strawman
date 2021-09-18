import React, { Component } from 'react';
import GarmentComponent from './GarmentComponent';
import Garment from './Garment';

class Wardrobe extends Component{

    render() {
        return (
            <div>
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
                                    {garmentName}
                                    <Wardrobe
                                        wardrobe={this.props.wardrobe[garmentName]}
                                        selectGarment={this.props.selectGarment}
                                    ></Wardrobe>
                                </div>
                            )
                        }
                    })
                }
            </div>
        );
    }
}

export default Wardrobe;
