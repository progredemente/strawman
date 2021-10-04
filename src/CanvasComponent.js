import React, { Component, createRef } from 'react';
import './CanvasComponent.css';
import Garment from './Garment';
import i18n from './i18n';

class CanvasComponent extends Component{

    constructor(props) {
        super(props);
        this.side = this.props.strawman.h;
        this.canvas = createRef();
        this.img = new Image();
        this.img.src = "./merge.png";
        this.maxScaleFactor = 1.25;
        this.state = {
            scaleFactor: this.getScaleFactor()
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState({scaleFactor: this.getScaleFactor()});
        })
        this.img.onload = () => {
            this.drawCanvas();
        }
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    render() {
        return (
            <div className="canvas-component">
                <h1>{i18n["strawman"][this.props.lang]}</h1>
                <canvas ref={this.canvas} width={this.side / this.state.scaleFactor} height={this.side / this.state.scaleFactor}/>
                <div className="download" onClick={() => {
                    this.downloadImage();
                }}>{i18n["download"][this.props.lang]}</div>
            </div>
        );
    }

    drawCanvas() {
        let tempCanvas = this.getTempCanvas();

        let realContext = this.canvas.current.getContext("2d");
        realContext.clearRect(0, 0, this.side / this.state.scaleFactor, this.side / this.state.scaleFactor);
        realContext.drawImage(tempCanvas, 0, 0, this.side / this.state.scaleFactor, this.side / this.state.scaleFactor);
    }

    getTempCanvas() {
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.side;
        tempCanvas.height = this.side;
        let tempContext = tempCanvas.getContext("2d");
        this.drawImage(this.props.strawman, this.props.strawman, tempContext);
        this.drawWardrobe(this.props.wardrobe, tempContext);
        return tempCanvas;
    }

    drawWardrobe(wardrobe, context){
        for(let garment of this.getClothes(wardrobe).sort((a, b) => a.order - b.order)){
            this.drawImage(garment.origin, garment.destination, context);
        }
    }

    getClothes(wardrobe){
        let clothes = [];
        for(let garmentName in wardrobe) {
            if(wardrobe[garmentName] instanceof Garment ){
                if(wardrobe[garmentName].selected){
                    clothes.push(wardrobe[garmentName]);
                }
            }
            else {
                clothes.push(...this.getClothes(wardrobe[garmentName]));
            }
        }
        return clothes;
    }

    drawImage(origin, destination, context){
        context.drawImage(this.img, origin.x, origin.y, origin.w, origin.h, destination.x, destination.y, destination.w, destination.h);
    }

    downloadImage(){
        let link = document.createElement('a');
        link.download = 'strawman.png';
        let canvas = this.getTempCanvas();
        canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob);
            link.href = url;
            link.click();
        })
    }

    getScaleFactor(){
        if(window.innerWidth < this.side / this.maxScaleFactor){
            return this.side / window.innerWidth;
        }
        return this.maxScaleFactor;
    }
}

export default CanvasComponent;
