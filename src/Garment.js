import ImageCropping from "./ImageCropping";

export default class Garment {

    constructor(name, wardrobeSection, origin, destination) {
        this.selected = false;
        this.name = name;
        this.wardrobeSection = wardrobeSection;
        this.origin = new ImageCropping(origin);
        this.destination = new ImageCropping(destination);
        this.order = destination.z;
    }

}