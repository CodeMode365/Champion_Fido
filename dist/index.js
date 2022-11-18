"use strict";
const canvas = document.getElementById("canvas1");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
const dropDown = document.getElementsByTagName("select");
console.log(dropDown.length);
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = "../assets/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
const playerState = "idle";
let frameX = 0;
let frameY = 4;
let gameFrame = 0;
let staggerFrames = 5;
const spriteAnimation = [];
const animationState = [
    { name: "idle", frames: 7 },
    { name: "jump", frames: 7 },
    { name: "fall", frames: 7 },
    { name: "run", frames: 9 },
    { name: "dizzy", frames: 11 },
    { name: "sit", frames: 5 },
    { name: "roll", frames: 7 },
    { name: "bite", frames: 7 },
    { name: "ko", frames: 12 },
    { name: "getHit", frames: 4 },
];
animationState.forEach((state, index) => {
    let frames = {
        loc: []
    };
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimation[state.name] = frames;
});
function animate() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, -40, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (gameFrame % staggerFrames == 0)
        frameX < 6 ? frameX++ : frameX = 0;
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
