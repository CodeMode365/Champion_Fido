"use strict";
const canvas1 = document.getElementById("sceneCanvas");
const CTX = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.getContext("2d");
const canvasHeight = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.height = 700;
const canvasWidth = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.width = 800;
let gameSpeed = 5;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "../assets/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "../assets/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "../assets/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "../assets/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "../assets/layer-5.png";
let x = 0;
let x2 = 2400;
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 2400;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
        this.update();
        console.log(image);
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        CTX.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}
const layer4 = new Layer(backgroundLayer4, 0.5);
function animateScene() {
    CTX.clearRect(0, 0, canvasWidth, canvasHeight);
    layer4.draw();
    requestAnimationFrame(animateScene);
}
animateScene();
