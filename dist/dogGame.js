"use strict";
window.addEventListener("load", function () {
    const canvas = document.getElementById("dogge");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 700;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    class InputHandler {
        constructor() {
            this.keys = new Array;
            this.touchY = 0;
            this.touchX = 0;
            this.touchThreshold = 30;
            window.onkeydown = (e) => {
                if ((e.key ==
                    "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.indexOf(e.key)) {
                    this.keys.push(e.key);
                }
                else if (e.key == "Enter" && gameOver) {
                    restart();
                }
                if (this.keys.length > 2) {
                    this.keys.splice(this.keys.length - 1, 1);
                }
            };
            window.onkeyup = (e) => {
                if (e.key ==
                    "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            };
            window.ontouchstart = ((e) => {
                this.touchY = e.changedTouches[0].pageY;
                this.touchX = e.changedTouches[0].pageX;
            });
            window.ontouchmove = ((e) => {
                const swipeVert_distance = e.changedTouches[0].pageY - this.touchY;
                const swipeHori_distance = e.changedTouches[0].pageX - this.touchX;
                if (swipeVert_distance < -this.touchThreshold && this.keys.indexOf("ArrowUp") === -1) {
                    this.keys.push('ArrowUp');
                }
                else if (swipeVert_distance > this.touchThreshold && this.keys.indexOf("ArrowDown") === -1) {
                    this.keys.push("ArrowDown");
                    if (gameOver) {
                        restart();
                    }
                }
            });
            window.ontouchend = ((e) => {
                this.keys.splice(this.keys.indexOf("ArrowUp", 1));
                this.keys.splice(this.keys.indexOf("ArrowDown", 1));
                this.keys.splice(this.keys.indexOf("ArrowRight", 1));
                this.keys.splice(this.keys.indexOf("ArrowLeft", 1));
            });
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
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image.src = "../assets/player.png";
            this.y = this.gameHeight - this.height;
        }
        update(input, deltaTime, enemies) {
            enemies.forEach((enemy) => {
                const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (enemy.width / 2 + player.width / 2)) {
                    gameOver = true;
                }
            });
            if (input.keys.indexOf("ArrowRight") > -1)
                this.speed = 5;
            else if (input.keys.indexOf("ArrowLeft") > -1)
                this.speed = -5;
            else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
                this.vY -= 25;
            }
            else
                this.speed = 0;
            this.x += this.speed;
            if (this.x <= 0)
                this.x = 0;
            else if (this.x >= this.gameWidth - this.width)
                this.x = this.gameWidth - this.width;
            this.y += this.vY;
            if (!this.onGround()) {
                this.vY += this.weight;
                this.frameY = 1;
                this.maxFrame = 5;
            }
            else {
                this.vY = 0;
                this.maxFrame = 8;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height)
                this.y = this.gameHeight - this.height;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame)
                    this.frameX = 0;
                else
                    this.frameX++;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
        }
        draw() {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
        restart() {
            this.x = 100;
            this.gameHeight - this.height;
            this.frameY = 0;
            this.frameX = 0;
        }
    }
    class Background {
        constructor(gameWeidth, gameHeight) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.speed = 2.5;
            this.image = new Image();
            this.gameWidth = gameWeidth;
            this.gameHeight = gameHeight;
            this.image.src = "../assets/background.png";
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width)
                this.x = 0;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed / 2, this.y, this.width, this.height);
        }
        restart() {
            this.x = 0;
        }
    }
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = 0;
            this.height = 0;
            this.x = 0;
            this.y = 0;
            this.image = new Image();
            this.frameX = 0;
            this.speed = Math.random() * 2.5 + 2.5;
            this.markForDeletion = false;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.maxFrame = 5;
            this.gameWidth = gameWidth;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.gameHeight = gameHeight;
            this.image.src = "../assets/enemy_worm.png";
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
        }
        update(deltaTime) {
            this.x -= this.speed;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame)
                    this.frameX = 0;
                else
                    this.frameX++;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
            if (this.x < 0 - this.width) {
                this.markForDeletion = true;
                score++;
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    function handleEnemies(deltaTime) {
        if (enemyTImer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTImer = 0;
            randomEnemyInterval = Math.random() * 1000 + 500;
        }
        else {
            enemyTImer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markForDeletion);
    }
    function displayStatusText(context) {
        context.fillStyle = "black";
        context.font = "40px Helvetica";
        context.fillText("Score: " + score, 50, 50);
        context.fillStyle = "white";
        context.fillText("Score: " + score, 52, 52);
        context.fillStyle = "black";
        context.font = "20px Helvetica";
        context.fillText("Hight Score: " + score, 50, 80);
        context.fillStyle = "white";
        context.fillText("Hight Score: " + score, 52, 82);
        if (gameOver) {
            context.textAlign = "center";
            context.font = "35px Impact";
            context.fillStyle = "green";
            context.fillText("Game Over try again!", canvas.width / 2, canvas.height / 2);
            context.fillStyle = "white";
            context.fillText("Game Over try again!", canvas.width / 2 + 1, canvas.height / 2 + 1);
            context.fillStyle = "green";
            context.fillText("Game Over try again!", canvas.width / 2 + 3, canvas.height / 2 + 3);
            context.font = "30px Impact";
            context.fillStyle = "red";
            context.fillText("Press enter to try", canvas.width / 2, canvas.height / 2 + 35);
            context.fillStyle = "white";
            context.fillText("Press enter to try", canvas.width / 2 + 1, canvas.height / 2 + 1 + 35);
            context.fillStyle = "red";
            context.fillText("Press enter to try", canvas.width / 2 + 3, canvas.height / 2 + 3 + 35);
        }
    }
    function restart() {
        player.restart();
        background.restart();
        enemies = [];
        score = 0;
        gameOver = false;
        animate(0);
    }
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const enemy1 = new Enemy(canvas.width, canvas.height);
    let lastTime = 0;
    let enemyTImer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.update();
        background.draw(ctx);
        player.draw();
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver)
            requestAnimationFrame(animate);
    }
    animate(0);
});
