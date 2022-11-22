"use strict";
window.addEventListener("load", function () {
    const canvas = document.getElementById("dogge");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 720;
    class InputHandler {
        constructor() {
            this.keys = [];
            window.onkeydown = (e) => {
                if ((e.key ==
                    "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.indexOf(e.key)) {
                    this.keys.push(e.key);
                    console.log(this.keys);
                }
            };
            window.onkeyup = (e) => {
                if (e.key ==
                    "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    console.log(this.keys);
                }
            };
        }
    }
    class Player {
        constructor(gameWidth, gameHeight) {
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.spriteHeight = 0;
            this.spriteWIdth = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vY = 0;
            this.weight = 1;
            this.image = new Image();
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image.src = "../assets/player.png";
            this.y = this.gameHeight - this.height;
        }
        update(input) {
            if (input.keys.indexOf("ArrowRight") > -1)
                this.speed = 5;
            else if (input.keys.indexOf("ArrowLeft") > -1)
                this.speed = -5;
            else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround())
                this.vY -= 30;
            else
                this.speed = 0;
            if (this.x <= 0)
                this.x = 0;
            else if (this.x >= this.gameWidth - this.width)
                this.x = this.gameWidth - this.width;
            this.y += this.vY;
            if (!this.onGround())
                this.vY += this.weight, this.frameY = 1;
            else
                this.vY = 0, this.frameY = 0;
            if (this.y >= this.gameHeight - this.height)
                this.y = this.gameHeight - this.height;
            this.x += this.speed;
        }
        draw() {
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }
    class Background {
        constructor() {
        }
    }
    class Enemy {
        constructor() {
        }
    }
    function handleEnemies() {
    }
    function displayStatusText() {
    }
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();
});
