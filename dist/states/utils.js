import InputHandler from "./input.js";
export function drawStatusText(ctx, input) {
    ctx.font = "30px Helvetica";
    ctx.fillText("Last input: " + input.lastKey, 10, 30);
}
