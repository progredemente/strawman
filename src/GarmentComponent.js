import React, { Component } from 'react';
import './GarmentComponent.css';

class GarmentComponent extends Component{

    render() {
        return (
            <div
                className={`garment${this.props.garment.selected ? " selected" : ""}`}
                onClick={() => {
                    this.props.selectGarment(this.props.garment);
                }}
            >
                <img
                    src='./merge.png'
                    style={{
                        "--x": `${this.props.garment.origin.x}px`,
                        "--y": `${this.props.garment.origin.y}px`,
                        "--w": `${this.props.garment.origin.w}px`,
                        "--h": `${this.props.garment.origin.h}px`
                    }}
                    alt={this.props.garment.name}
                />
                {this.props.garment.name}
            </div>
        );
    }
}

export default GarmentComponent;
