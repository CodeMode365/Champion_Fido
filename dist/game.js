import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import { Background } from "./background.js";
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js";
import { UI } from "./UI.js";
import { Sitting, Running, Jumping, Falling, Rolling, State } from "./playerState.js";
import { Dust, Particle } from "./Particles.js";
import { collisionAnimation } from "./collisionAnimation.js";
import { FloatingMsg } from "./floatingMsg.js";
export default class Game {
    constructor(width, height) {
        var _a;
        this.speed = 0;
        this.maxSpeed = 6;
        this.score = 0;
        this.particles = [];
        this.collisions = [];
        this.maxParticles = 70;
        this.playerLives = new Image();
        this.lives = 5;
        this.floatingMessage = [];
        this.targetScore = 40;
        this.Music = new Audio();
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.debug = false;
        this.fontColor = "black";
        this.maxTime = 30000;
        this.time = 0;
        this.gameOver = false;
        this.groundMarin = 80;
        this.width = width;
        this.height = height;
        this.input = new InputHandler(this);
        this.player = new Player(this);
        this.background = new Background(this);
        this.UI = new UI(this);
        this.player.currentState = this.player.states[0];
        (_a = this.player.currentState) === null || _a === void 0 ? void 0 : _a.enter();
    }
    update(deltaTime) {
        var _a;
        this.time += deltaTime;
        if (this.time > this.maxTime)
            this.gameOver = true;
        this.background.update();
        this.player.update(this.input.keys, deltaTime);
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
        (_a = this.enemies) === null || _a === void 0 ? void 0 : _a.forEach((enemy) => {
            enemy.update(deltaTime);
        });
        this.enemies = this.enemies.filter((enemy) => !enemy.markedFordDeletion);
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.markedForDeletion)
                this.particles.splice(index, 1);
        });
        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime);
            if (collision.markedForDeletion)
                this.collisions.splice(index, 1);
        });
        this.floatingMessage.forEach((message, index) => {
            message.update();
        });
        this.floatingMessage = this.floatingMessage.filter((message) => !message.markedForDeletion);
    }
    draw(ctx) {
        var _a;
        this.background.draw(ctx);
        this.particles.forEach((particle, index) => {
            particle.draw(ctx);
        });
        this.player.draw(ctx);
        (_a = this.enemies) === null || _a === void 0 ? void 0 : _a.forEach((enemy) => {
            enemy.draw(ctx);
        });
        this.collisions.forEach((collision, index) => {
            collision.draw(ctx);
        });
        this.floatingMessage.forEach((message) => {
            message.draw(ctx);
        });
        this.UI.draw(ctx);
        this.UI.draw(ctx);
    }
    addEnemy() {
        if ((this.speed > 0) && (Math.random() > 0.5))
            this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0)
            this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyEnemy(this));
    }
}
