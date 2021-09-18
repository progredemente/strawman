import React, { Component, createRef } from 'react';
import Garment from './Garment';

class CanvasComponent extends Component{

    constructor(props) {
        super(props);
        this.side = this.props.strawman.h;
        this.canvas = createRef();
        this.scaleFactor = 1.25;
        this.img = new Image();
        this.img.src = "./merge.png";
    }

    componentDidMount() {
        this.img.onload = () => {
            this.drawCanvas();
        }
    }

    componentDidUpdate() {
        this.drawCanvas();
    }


    render() {
        return (
            <div>
                <canvas ref={this.canvas} width={this.side / this.scaleFactor} height={this.side / this.scaleFactor}/>
            </div>
        );
    }

    drawCanvas() {
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.side;
        tempCanvas.height = this.side;
        let tempContext = tempCanvas.getContext("2d");
        this.drawImage(this.props.strawman, this.props.strawman, tempContext);
        this.drawWardrobe(this.props.wardrobe, tempContext);

        let realContext = this.canvas.current.getContext("2d");
        realContext.clearRect(0, 0, this.side / this.scaleFactor, this.side / this.scaleFactor);
        realContext.drawImage(tempCanvas, 0, 0, this.side / this.scaleFactor, this.side / this.scaleFactor);
    }

    drawWardrobe(wardrobe, context){
        for(let garmentName in wardrobe) {
            if(wardrobe[garmentName] instanceof Garment ){
                if(wardrobe[garmentName].selected){
                    this.drawImage(wardrobe[garmentName].origin, wardrobe[garmentName].destination, context);
                }
            }
            else {
                this.drawWardrobe(wardrobe[garmentName], context);
            }
        }
    }

    drawImage(origin, destination, context){
        context.drawImage(this.img, origin.x, origin.y, origin.w, origin.h, destination.x, destination.y, destination.w, destination.h);
    }
}

export default CanvasComponent;
