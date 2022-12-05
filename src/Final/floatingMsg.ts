export class FloatingMsg {
    private value: string
    private x: number
    private y: number
    private targetX: number
    private targetY: number
    public markedForDeletion = false
    private timer = 0
    constructor(value: string, x: number, y: number, targetX: number, targetY: number) {
        this.value = value
        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY
    }
    update() {
        this.x += (this.targetX - this.x)*0.04
        this.y += (this.targetY - this.y)*0.04
        this.timer++
        if (this.timer > 100) this.markedForDeletion = true
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Creepster"
        ctx.fillStyle = "white"
        ctx.fillText(this.value, this.x, this.y)
        ctx.fillStyle = "rgba(140,170,200,0.3)"
        ctx.fillText(this.value, this.x + 2, this.y + 2)
    }
}