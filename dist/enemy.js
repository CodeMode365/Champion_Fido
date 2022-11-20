"use strict";
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const canvas_width = canvas3.width = 700;
const canvas_height = canvas3.height = 1000;
const numOfEnemy = 20;
const enemyArray = [];
let GameFrame = 0;
class Enemy {
    constructor() {
        this.enemyImage = new Image();
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.height = this.spriteHeight / 2;
        this.width = this.spriteHeight / 1.2;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.enemyImage.src = "../assets/enemy1.png";
        this.x = Math.random() * (canvas_height - this.width);
        this.y = Math.random() * (canvas_height - this.height);
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx3.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
[...Array(numOfEnemy).keys()].forEach((el) => {
    enemyArray.push(new Enemy());
});
function animate() {
    ctx3.clearRect(0, 0, canvas_width, canvas_height);
    enemyArray.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    GameFrame++;
    requestAnimationFrame(animate);
}
animate();
