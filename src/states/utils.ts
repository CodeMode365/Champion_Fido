import InputHandler from "./input.js";
import Player from "./Player.js";
export function drawStatusText(ctx: CanvasRenderingContext2D, input: InputHandler, player: Player): void {

    ctx.font = "30px Helvetica";
    ctx.fillText("Last input: " + input.lastKey, 10, 30)
    ctx.fillText("Active state: " + player.currentState?.state, 10, 70)

}
