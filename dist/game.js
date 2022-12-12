import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import { Background } from "./background.js";
import { FlyEnemy, GroundEnemy, ClimbingEnemy, MonsterBat, Zombies, Enemy } from "./Enemy.js";
import { UI } from "./UI.js";
import { Dust, Particle } from "./Particles.js";
import { collisionAnimation } from "./collisionAnimation.js";
import { FloatingMsg } from "./floatingMsg.js";
import { Items, Boost, Heart } from "./Items.js";
import { TeamDog } from "./HelperDog.js";
export default class Game {
    constructor(width, height) {
        var _a;
        this.speed = 0;
        this.maxSpeed = 6;
        this.coins = 0;
        this.particles = [];
        this.collisions = [];
        this.maxParticles = 70;
        this.playerLives = new Image();
        this.maxLives = 10;
        this.lives = 5;
        this.floatingMessage = [];
        this.items = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 3000;
        this.debug = false;
        this.fontColor = "black";
        this.gameOver = false;
        this.boostLength = 200;
        this.boostHeight = 25;
        this.boostImg = new Image();
        this.maxBooster = 200;
        this.highScore = 0;
        this.boostDecreaser = 0.2;
        this.distanceTraveled = 0;
        this.checkPointForHeart = [7];
        this.checkPointForBooster = [10];
        this.groundMarin = 80;
        this.width = width;
        this.height = height;
        this.input = new InputHandler(this);
        this.player = new Player(this);
        this.background = new Background(this);
        this.UI = new UI(this);
        this.player.currentState = this.player.states[0];
        (_a = this.player.currentState) === null || _a === void 0 ? void 0 : _a.enter();
        this.boostX = this.width - this.boostLength * 1.4;
        this.boostY = 30;
        this.boostImg.src = "../assets/others/flame.png";
        for (let i = 1; i <= 30; i++) {
            this.checkPointForBooster[i] = this.checkPointForBooster[i - 1] + i * 6;
            this.checkPointForHeart[i] = this.checkPointForHeart[i - 1] + i * 6;
        }
        this.boosterCurrentPoint = this.checkPointForHeart[0];
        this.heartCurrentPoint = this.checkPointForBooster[0];
    }
    update(deltaTime) {
        var _a, _b, _c;
        if (localStorage.getItem("highScore")) {
            this.highScore = parseInt(localStorage.getItem("highScore"));
        }
        else {
            localStorage.setItem("highScore", "0");
            this.highScore = this.distanceTraveled;
        }
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
        this.addItems();
        this.items.forEach((item) => {
            item.update();
        });
        this.items = this.items.filter((item) => !item.markedForDeletion);
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
        (_b = this.Teams) === null || _b === void 0 ? void 0 : _b.update(deltaTime);
        if ((_c = this.Teams) === null || _c === void 0 ? void 0 : _c.markedFordDeletion) {
            this.Teams = null;
        }
        this.distanceTraveled += this.speed / 1000;
    }
    draw(ctx) {
        var _a, _b;
        this.background.draw(ctx);
        this.particles.forEach((particle, index) => {
            particle.draw(ctx);
        });
        ctx.drawImage(this.boostImg, this.boostX - 30, this.boostY, 30, 25);
        ctx.save();
        ctx.fillStyle = "rgba(255,50,50,0.9)";
        ctx.fillRect(this.boostX, this.boostY, this.boostLength, this.boostHeight);
        ctx.strokeRect(this.boostX, this.boostY, this.maxBooster, this.boostHeight);
        ctx.restore();
        this.player.draw(ctx);
        (_a = this.enemies) === null || _a === void 0 ? void 0 : _a.forEach((enemy) => {
            enemy.draw(ctx);
        });
        (_b = this.Teams) === null || _b === void 0 ? void 0 : _b.draw(ctx);
        this.collisions.forEach((collision, index) => {
            collision.draw(ctx);
        });
        this.floatingMessage.forEach((message) => {
            message.draw(ctx);
        });
        this.items.forEach((item) => {
            item.draw(ctx);
        });
        this.UI.draw(ctx);
    }
    addEnemy() {
        if ((this.speed > 0) && (Math.random() > 0.5)) {
            this.enemies.push(new GroundEnemy(this));
            if (Math.random() > 0.5) {
                this.enemies.push(new MonsterBat(this));
            }
        }
        else if (this.speed > 0)
            this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyEnemy(this));
        if (this.distanceTraveled > 5 && (Math.random() * 2 < .5) && (this.distanceTraveled > 25)) {
            this.enemies.push(new Zombies(this));
        }
    }
    addItems() {
        const travel = Math.round(this.distanceTraveled);
        if (travel > 0 && (travel % this.boosterCurrentPoint == 0) && (this.items.length == 0)) {
            this.items.push(new Boost(this));
            this.boosterCurrentPoint = this.checkPointForBooster[this.checkPointForBooster.indexOf(this.boosterCurrentPoint) + 1];
            this.boostDecreaser -= 0.015;
            this.maxBooster += 1;
        }
        else if (travel > 0 && (travel % this.heartCurrentPoint == 0) && (this.items.length == 0)) {
            this.items.push(new Heart(this));
            this.heartCurrentPoint = this.checkPointForHeart[this.checkPointForHeart.indexOf(this.heartCurrentPoint) + 1];
        }
    }
}
