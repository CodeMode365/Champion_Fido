import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import { Background } from "./background.js";
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js";
export default class Game {
    constructor(width, height) {
        this.speed = 0;
        this.maxSpeed = 6;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.groundMarin = 80;
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.player = new Player(this);
        this.background = new Background(this);
    }
    update(deltaTime) {
        var _a;
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
            if (enemy.markedFordDeletion)
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
        });
    }
    draw(ctx) {
        var _a;
        this.background.draw(ctx);
        this.player.draw(ctx);
        (_a = this.enemies) === null || _a === void 0 ? void 0 : _a.forEach((enemy) => {
            enemy.draw(ctx);
        });
    }
    addEnemy() {
        if ((this.speed > 0) && (Math.random() > 0.5))
            this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0)
            this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyEnemy(this));
    }
}
