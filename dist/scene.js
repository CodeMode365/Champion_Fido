"use strict";
const canvas1 = document.getElementById("sceneCanvas");
const CTX = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.getContext("2d");
const canvasHeight = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.height = 700;
const canvasWidth = canvas1 === null || canvas1 === void 0 ? void 0 : canvas1.width = 800;
let gameSpeed = 15;
const slider = document.getElementById('slider');
const speedOutput = document.getElementById("showGameSpeed");
slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
});
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
window.addEventListener("load", () => {
    let x = 0;
    let x2 = 2400;
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = this.x - this.speed;
        }
        draw() {
            CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
            CTX.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    const layer1 = new Layer(backgroundLayer1, .5);
    const layer2 = new Layer(backgroundLayer2, .4);
    const layer3 = new Layer(backgroundLayer3, .4);
    const layer4 = new Layer(backgroundLayer4, .2);
    const layer5 = new Layer(backgroundLayer5, 1);
    const gameObject = [layer1, layer2, layer3, layer4, layer5];
    function animateScene() {
        CTX.clearRect(0, 0, canvasWidth, canvasHeight);
        gameObject.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animateScene);
    }
    animateScene();
});
