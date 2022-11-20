"use strict";
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const canvas_width = canvas3.width = 700;
const canvas_height = canvas3.height = 1000;
const numOfEnemy = 100;
const enemyArray = [];
let GameFrame = 0;
class Enemy1 {
    constructor() {
        this.enemyImage = new Image();
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.enemyImage.src = "../assets/enemy1.png";
        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height);
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx3 === null || ctx3 === void 0 ? void 0 : ctx3.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
class Enemy2 extends Enemy1 {
    constructor() {
        super();
        this.angle = 0;
        this.angleSpeed = 0;
        this.curveMotion = 0;
        this.enemyImage.src = "../assets/enemy2.png";
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.speed = Math.random() * 4 + 1;
        this.angleSpeed = Math.random() * 0.2;
        this.curveMotion = Math.random() * 7;
    }
    update() {
        this.x -= this.speed;
        this.y += this.curveMotion * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = canvas3.width;
        }
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
}
class Enemy3 extends Enemy2 {
    constructor() {
        super();
        this.enemyImage.src = "../assets/enemy3.png";
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
    }
    update() {
        this.x = canvas3.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas3.width / 2 - this.width / 2);
        this.y = canvas3.height / 2 * Math.cos(this.angle * Math.PI / 270) + (canvas3.height / 2 - this.height / 2);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = canvas3.width;
        }
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
}
[...Array(numOfEnemy).keys()].forEach((el) => {
    enemyArray.push(new Enemy3());
});
function animate() {
    ctx3 === null || ctx3 === void 0 ? void 0 : ctx3.clearRect(0, 0, canvas_width, canvas_height);
    enemyArray.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    GameFrame++;
    requestAnimationFrame(animate);
}
animate();
