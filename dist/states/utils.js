import InputHandler from "./input.js";
import Player from "./Player.js";
export function drawStatusText(ctx, input, player) {
    var _a;
    ctx.font = "30px Helvetica";
    ctx.fillText("Last input: " + input.lastKey, 10, 30);
    ctx.fillText("Active state: " + ((_a = player.currentState) === null || _a === void 0 ? void 0 : _a.state), 10, 70);
}
