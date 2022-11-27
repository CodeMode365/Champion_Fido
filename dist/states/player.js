export default class Player {
    constructor(gameWidth, gameHeight) {
        this.width = 200;
        this.height = 181.83;
        this.image = new Image();
        this.frameX = 0;
        this.frameY = 0;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = gameHeight - this.height;
        this.image.src = "../assets/white_dog.png";
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
