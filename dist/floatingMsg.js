export class FloatingMsg {
    constructor(value, x, y, targetX, targetY) {
        this.markedForDeletion = false;
        this.timer = 0;
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
    }
    update() {
        this.x += (this.targetX - this.x) * 0.04;
        this.y += (this.targetY - this.y) * 0.04;
        this.timer++;
        if (this.timer > 100)
            this.markedForDeletion = true;
    }
    draw(ctx) {
        ctx.font = "20px Creepster";
        ctx.fillStyle = "white";
        ctx.fillText(this.value, this.x, this.y);
        ctx.fillStyle = "rgba(140,170,200,0.3)";
        ctx.fillText(this.value, this.x + 2, this.y + 2);
    }
}
