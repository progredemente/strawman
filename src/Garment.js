import ImageCropping from "./ImageCropping";

export default class Garment {

    constructor(name, category, origin, destination) {
        this.selected = false;
        this.name = name;
        this.category = category;
        this.origin = new ImageCropping(origin);
        this.destination = new ImageCropping(destination);
        this.order = destination.z;
        this.thumbnail = new ImageCropping(origin.t)
    }

}