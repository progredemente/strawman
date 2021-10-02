import React, { Component } from 'react';
import './GarmentComponent.css';
import i18n from './i18n.json';

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
                    alt={i18n[this.props.garment.name][this.props.lang]}
                />
                <figcaption>{i18n[this.props.garment.name][this.props.lang]}</figcaption>
            </div>
        );
    }
}

export default GarmentComponent;
