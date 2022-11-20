"use strict";
const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
canvas4.width = 500;
canvas4.height = 700;
const explosions = [];
const canvasPosition = canvas4.getBoundingClientRect();
class Explosions {
    constructor(x, y) {
        this.image = new Image();
        this.sound = new Audio();
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.image.src = "../assets/boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound.src = "../assets/sounds/fire.wav";
    }
    update() {
        this.timer++;
        if (this.frame === 0)
            this.sound.play();
        if (this.timer % 10 === 0)
            this.frame++;
    }
    draw() {
        ctx4.save();
        ctx4.translate(this.x, this.y);
        ctx4.rotate(this.angle);
        ctx4.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.height, this.width);
        ctx4.restore();
    }
}
const creatAnimation = (e) => {
    const positionX = e.x - canvasPosition.left;
    const positionY = e.y - canvasPosition.top;
    explosions.push(new Explosions(positionX, positionY));
};
window.addEventListener("click", (e) => {
    creatAnimation(e);
});
function animate() {
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    explosions.forEach((explozer, index) => {
        explozer.update();
        explozer.draw();
        if (explozer.frame > 5) {
            if (explosions.length != 1) {
                explosions.splice(index, 1);
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();
