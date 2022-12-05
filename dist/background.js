import Game from "./game.js";
export class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifer = speedModifier;
        this.image = image;
    }
    update() {
        if (this.x < -this.width)
            this.x = 0;
        else
            this.x -= this.game.speed * this.speedModifer;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
export class Background {
    constructor(game) {
        this.width = 1667;
        this.height = 500;
        this.layer1image = new Image();
        this.layer2image = new Image();
        this.layer3image = new Image();
        this.game = game;
        this.layer1image.src = "../assets/colourful/layer-1.png";
        this.layer2image.src = "../assets/colourful/layer-2.png";
        this.layer3image.src = "../assets/colourful/layer-3.png";
        this.layer1 = new Layer(this.game, this.width, this.height, 0.1, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.4, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 1, this.layer3image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3];
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}
