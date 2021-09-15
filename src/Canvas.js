import React, { Component, createRef } from 'react';
import merge from './merge.json';
import config from './config.json';

class Canvas extends Component{
    canvas = createRef();

    componentDidMount() {
        let context = this.canvas.current.getContext("2d");
        let img = new Image();
        img.src = "./merge.png";
        img.onload = () => {
            context.drawImage(img,0,0, 1000, 1000, 0, 0, 1000, 1000);
            let maga = merge.gorros.maga;
            let gorroConfig = config.gorros;
            context.drawImage(img, maga.x, maga.y, maga.w, maga.h, gorroConfig.x, gorroConfig.y, gorroConfig.w, gorroConfig.h);
        }
    }

    render() {
        return (
            <canvas ref={this.canvas} width="1000" height="1000"/>
        );
    }
}

export default Canvas;
