"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
window.onload = () => {
    var _Game_instances, _Game_addNewEnemy;
    const CVX = document.getElementById("canvasEnemy");
    const contX = CVX.getContext("2d");
    CVX.width = 500;
    CVX.height = 500;
    class Game {
        constructor(ctx, canvasWidth, canvasHeight) {
            _Game_instances.add(this);
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemies = [];
            this.enemyTypes = ["worm", "ghost", "spider"];
            this.context = ctx;
            this.width = canvasWidth;
            this.height = canvasHeight;
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_addNewEnemy).call(this);
        }
        update(deltaTime) {
            deltaTime = deltaTime ? deltaTime : 0;
            if (this.enemyTimer > this.enemyInterval) {
                __classPrivateFieldGet(this, _Game_instances, "m", _Game_addNewEnemy).call(this);
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime ? deltaTime : 0;
            }
            this.enemies.forEach((object) => {
                object.update(deltaTime);
            });
            this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
        }
        draw() {
            this.enemies.forEach((object) => {
                object.draw(this.context);
            });
        }
    }
    _Game_instances = new WeakSet(), _Game_addNewEnemy = function _Game_addNewEnemy() {
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if (randomEnemy == "ghost")
            this.enemies.push(new Ghost(this));
        else if (randomEnemy == "worm")
            this.enemies.push(new Worm(this));
        else if (randomEnemy == "spider")
            this.enemies.push(new Spider(this));
        this.enemies.sort((a, b) => {
            return a.y - b.y;
        });
    };
    class Enemy {
        constructor(game) {
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.image = new Image();
            this.speed = Math.random() * 2 + 0.1;
            this.vX = Math.random() * .25;
            this.vY = .25;
            this.frameX = 0;
            this.maxFrame = 5;
            this.framInterval = 100;
            this.frameTimer = 0;
            this.game = game;
            this.height = 100;
            this.weidth = 100;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.markedForDeletion = false;
        }
        update(deltaTime) {
            this.x -= this.vX * deltaTime;
            if (this.x < 0 - this.weidth) {
                this.markedForDeletion = true;
            }
            if (this.frameTimer > this.framInterval) {
                if (this.frameX < this.maxFrame)
                    this.frameX++;
                else
                    this.frameX = 0;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.weidth, this.height);
        }
    }
    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.height = this.spriteHeight / 2.5;
            this.weidth = this.spriteWidth / 2;
            this.x = game.width;
            this.y = game.height - this.height;
            this.image.src = "../assets/enemy_worm.png";
        }
    }
    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.opacity = Math.random() * .6 + 0.2;
            this.angle = 0;
            this.curve = Math.random() * 1.5;
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.height = this.spriteHeight / 2.5;
            this.weidth = this.spriteWidth / 2;
            this.x = game.width;
            this.y = Math.random() * game.height - (this.height);
            this.image.src = "../assets/enemy_ghost.png";
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.02;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            super.draw(ctx);
            ctx.restore();
        }
    }
    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.opacity = Math.random() * .6 + 0.2;
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.height = this.spriteHeight / 2.5;
            this.weidth = this.spriteWidth / 2;
            this.x = Math.random() * game.width;
            this.y = 0 - this.height;
            this.vX = 0;
            this.vY = 1;
            this.image.src = "../assets/enemy_spider.png";
            this.maxLength = Math.random() * game.height - this.height;
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += this.vY;
            if (this.y > this.maxLength)
                this.vY *= -1;
            if (this.y < 0 - this.height * 2)
                this.markedForDeletion = true;
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.weidth / 2, 0);
            ctx.lineTo(this.x + this.weidth / 2, this.y + this.height / 2);
            ctx.stroke();
            super.draw(ctx);
        }
    }
    const game = new Game(contX, CVX.width, CVX.height);
    let lastTime;
    function animate(timestamp) {
        contX.clearRect(0, 0, CVX.width, CVX.height);
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
};
