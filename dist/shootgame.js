"use strict";
const canvaS = document.getElementById("shootGame");
const ctxS = canvaS.getContext("2d");
canvaS.width = window.innerWidth;
canvaS.height = window.innerHeight;
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCTX = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
let timeToNextRaven = 0;
const ravenIntarval = 500;
let lastTime = 0;
let score = 0;
let gameOver = false;
const explozers = [];
let highScore;
if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
}
else {
    localStorage.setItem("highScore", "0");
    highScore = 0;
}
class Explosion {
    constructor(x, y, size) {
        this.spriteHeight = 179;
        this.spriteWidth = 200;
        this.explodeImage = new Image();
        this.explodeEffect = new Audio();
        this.frame = 0;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
        this.x = x;
        this.y = y;
        this.explodeImage.src = "../assets/boom.png";
        this.explodeEffect.src = "../assets/sounds/gun.mp3";
        this.size = size;
    }
    update(deltaTime) {
        if (this.frame === 0)
            this.explodeEffect.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) {
                this.markedForDeletion = true;
            }
        }
    }
    draw() {
        ctxS.drawImage(this.explodeImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);
    }
}
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
        this.randmColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.GenColor = `rgba(${this.randmColor[0]},${this.randmColor[1]},${this.randmColor[2]})`;
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
        if (this.x < 0 - this.width)
            gameOver = true;
    }
    draw() {
        collisionCTX.fillStyle = this.GenColor;
        collisionCTX.fillRect(this.x, this.y, this.width, this.height);
        ctxS.drawImage(this.creatureImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
function drawScore() {
    ctxS.font = "50px Impact";
    ctxS.fillStyle = "black";
    ctxS.fillText("Score: " + score, 50, 75);
    ctxS.fillStyle = "white";
    ctxS.fillText("Score: " + score, 52, 76);
    ctxS.fillText("Score: " + score, 53, 76);
    ctxS.fillStyle = "black";
    ctxS.fillText("Score: " + score, 54, 76);
    ctxS.fillStyle = "black";
    ctxS.font = "30px Impact";
    ctxS.fillText("Hight Score: " + highScore, 54, 136);
}
function GAME_OVER() {
    ctxS.textAlign = "center";
    ctxS.font = "80px Impact";
    ctxS.fillStyle = "black";
    ctxS.fillText("GAME OVER", canvaS.width / 2 - 4, canvaS.height / 2 - 4);
    ctxS.fillStyle = "white";
    ctxS.fillText("GAME OVER", canvaS.width / 2 - 2, canvaS.height / 2 - 2);
    ctxS.fillStyle = "rgb(230,120,60)";
    ctxS.fillText("GAME OVER", canvaS.width / 2, canvaS.height / 2);
    ctxS.fillStyle = "black";
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2 - 4, canvaS.height / 2 + 80 - 4);
    ctxS.fillStyle = "white";
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2 - 2, canvaS.height / 2 + 80 - 2);
    ctxS.fillStyle = "rgb(64,134,74)";
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2, canvaS.height / 2 + 80);
    if (score >= highScore) {
        localStorage.setItem("highScore", score.toLocaleString());
    }
}
window.addEventListener("click", (e) => {
    const deltectPixelColor = collisionCTX.getImageData(e.x, e.y, 1, 1);
    const pc = deltectPixelColor.data;
    ravens.forEach((raven) => {
        if (raven.randmColor[0] == Math.floor(pc[0]) && raven.randmColor[1] == Math.floor(pc[1]) && raven.randmColor[2] == Math.floor(pc[2])) {
            raven.markedForDeletion = true;
            score++;
            explozers.push(new Explosion(raven.x, raven.y, raven.width));
        }
    });
    if (score > highScore)
        highScore = score;
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
    [...ravens, ...explozers].forEach((object) => {
        object.update(deltaTime);
    });
    [...ravens, ...explozers].forEach((object) => {
        object.draw();
    });
    ravens = ravens.filter((raven) => !raven.markedForDeletion);
    if (!gameOver)
        requestAnimationFrame(animate);
    if (gameOver)
        GAME_OVER();
}
animate(0);
