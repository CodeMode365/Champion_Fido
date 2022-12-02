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
    }
}
export class Background {
    constructor(game) {
        this.width = 1667;
        this.height = 500;
        this.layer5image = new Image();
        this.game = game;
        this.layer5image.src = "../../assets/finalGame/layer-5.png";
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
        this.backgroundLayers = [this.layer1];
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
