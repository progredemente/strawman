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
                        "--x": `${this.props.garment.thumbnail.x}px`,
                        "--y": `${this.props.garment.thumbnail.y}px`,
                        "--w": `${this.props.garment.thumbnail.w}px`,
                        "--h": `${this.props.garment.thumbnail.h}px`
                    }}
                    alt={this.props.garment.name}
                />
            </div>
        );
    }
}

export default GarmentComponent;
