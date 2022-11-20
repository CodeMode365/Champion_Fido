"use strict";
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCTX = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
const canvaS = document.getElementById("shootGame");
const ctxS = canvaS.getContext("2d");
canvaS.width = window.innerWidth;
canvaS.height = window.innerHeight;
let timeToNextRaven = 0;
const ravenIntarval = 500;
let lastTime = 0;
const score = 0;
let ravens = [];
class Raven {
    constructor() {
        this.creatureImage = new Image();
        this.frame = 0;
        this.maxFrame = 4;
        this.sizeModifier = Math.random() * 0.6 + 0.5;
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.width = this.spriteWidth / 2 * this.sizeModifier;
        this.height = this.spriteHeight / 2 * this.sizeModifier;
        this.x = canvaS.width;
        this.y = Math.random() * (canvaS.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.creatureImage.src = "../assets/raven.png";
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randmColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.GenColor = `rgba(${this.randmColor[0]},${this.randmColor[1]},${this.randmColor[2]},${this.randmColor[3]})`;
    }
    update(deltaTime) {
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.y < 0 || this.y > canvaS.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) {
                this.frame = 0;
            }
            else {
                this.frame++;
            }
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }
    draw() {
        collisionCTX.fillStyle = this.GenColor;
        collisionCTX.fillRect(this.x, this.y, this.width, this.height);
        ctxS.drawImage(this.creatureImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
function drawScore() {
    ctxS.fillStyle = "white";
    ctxS.fillText("Score: " + score, 50, 75);
    ctxS.fillStyle = "whtie";
    ctxS.fillText("Score: " + score, 55, 80);
}
window.addEventListener("click", (e) => {
    const deltectPixelColor = ctxS.getImageData(e.x, e.y, 1, 1);
    console.log(deltectPixelColor);
});
function animate(timestamep) {
    ctxS.clearRect(0, 0, canvaS.width, canvaS.height);
    collisionCTX.clearRect(0, 0, canvaS.width, canvaS.height);
    const deltaTime = timestamep - lastTime;
    lastTime = timestamep;
    timeToNextRaven += deltaTime;
    drawScore();
    if (timeToNextRaven > ravenIntarval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        const newRav = new Raven();
        ravens.sort(function (a, b) {
            return a.width - b.width;
        });
    }
    [...ravens].forEach((raven) => {
        raven.update(deltaTime);
    });
    [...ravens].forEach((raven) => {
        raven.draw();
    });
    ravens = ravens.filter((raven) => !raven.markedForDeletion);
    requestAnimationFrame(animate);
}
animate(0);
