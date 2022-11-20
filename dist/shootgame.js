"use strict";
const canvaS = document.getElementById("shootGame");
const ctxS = canvaS.getContext("2d");
canvaS.width = window.innerWidth;
canvaS.height = window.innerHeight;
let timeToNextRaven = 0;
const ravenIntarval = 500;
let lastTime = 0;
let ravens = [];
class Raven {
    constructor() {
        this.width = 100;
        this.height = 100;
        this.x = canvaS.width;
        this.y = Math.random() * (canvaS.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
    }
    update() {
        this.x -= this.directionX;
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }
    draw() {
        ctxS.fillRect(this.x, this.y, this.width, this.height);
    }
}
let deletedRaven = [];
function animate(timestamep) {
    ctxS.clearRect(0, 0, canvaS.width, canvaS.height);
    const deltaTime = timestamep - lastTime;
    lastTime = timestamep;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenIntarval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }
    [...ravens].forEach((raven) => {
        raven.update();
    });
    [...ravens].forEach((raven) => {
        raven.draw();
    });
    requestAnimationFrame(animate);
}
animate(0);
