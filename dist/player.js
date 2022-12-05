import { Enemy } from "./Enemy.js";
import Game from "./game.js";
import { collisionAnimation } from "./collisionAnimation.js";
import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, State } from "./playerState.js";
import { FloatingMsg } from "./floatingMsg.js";
export default class Player {
    constructor(game) {
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.speed = 0;
        this.maxSpeed = 3;
        this.weight = 1;
        this.vY = 0;
        this.image = new Image();
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.Music = new Audio();
        this.game = game;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.image.src = "../assets/others/playerDog.png";
        this.y = this.game.height - this.height - this.game.groundMarin;
    }
    update(input, deltaTime) {
        var _a;
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.handleInput(input);
        this.x += this.speed;
        if (input.indexOf('ArrowRight') !== -1 && this.currentState !== this.states[6])
            this.speed = this.maxSpeed;
        else if (input.indexOf('ArrowLeft') != -1 && this.currentState !== this.states[6])
            this.speed = -this.maxSpeed;
        else
            this.speed = 0;
        this.y += this.vY;
        if (this.y > this.game.height - this.height - this.game.groundMarin) {
            this.y = this.game.height - this.height - this.game.groundMarin;
        }
        if (this.x <= 0)
            this.x = 0;
        else if (this.x >= this.game.width - this.width)
            this.x = this.game.width - this.width;
        if (!this.onGround())
            this.vY += this.weight;
        else
            this.vY = 0;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
        this.checkCollision();
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        if (this.game.debug)
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMarin;
    }
    setState(state, speed) {
        var _a;
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.enter();
    }
    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            if (enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y) {
                enemy.markedFordDeletion = true;
                this.game.collisions.push(new collisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                if (this.currentState == this.states[4] || this.currentState === this.states[5]) {
                    this.Music.src = "../assets/musics/attackFly.mp3";
                    this.game.score++;
                    this.game.floatingMessage.push(new FloatingMsg('+1', enemy.x, enemy.y, 150, 50));
                    this.Music.play();
                }
                else {
                    this.setState(6, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0)
                        this.game.gameOver = true;
                }
            }
        });
    }
}