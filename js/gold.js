var goldIm = new Image();
goldIm.src="images/gold1.png";
var rockIm = new Image();
rockIm.src="images/rock1.png";
var diamondIM = new Image();
diamondIM.src="images/diamond1.png";

class gold {
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        this.type = Math.floor(Math.random() * 100000) % 8;
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
        this.alive = true;
        this.update();
    }

    update() {
        switch (this.type) {
            case 0:
                this.speed = this.game.getWidth() / 5;
                this.width = this.game.getWidth();
                this.height = this.game.getWidth();
                this.IM = goldIm;
                this.score = 50;
                break;
            case 1:
                this.speed = this.game.getWidth() / 8;
                this.width = 1.5 * this.game.getWidth();
                this.height = 1.5 * this.game.getWidth();
                this.IM = goldIm;
                this.score = 100;
                break;
            case 2:
                this.speed = this.game.getWidth() / 20;
                this.width = 2.5 * this.game.getWidth();
                this.height = 2.5 * this.game.getWidth();
                this.IM = goldIm;
                this.score = 250;
                break;
            case 3:
                this.speed = this.game.getWidth() / 15;
                this.width = 1.5 * this.game.getWidth();
                this.height = 1.5 * this.game.getWidth();
                this.IM = rockIm;
                this.score = 50;
                break;
            case 4:
                this.speed = this.game.getWidth() / 30;
                this.width = 1.8 * this.game.getWidth();
                this.height = 1.8 * this.game.getWidth();
                this.IM = rockIm;
                this.score = 40;
                break;
            case 5:
                this.speed = this.game.getWidth() / 15;
                this.width = 2 * this.game.getWidth();
                this.height = 2 * this.game.getWidth();
                this.IM = rockIm;
                this.score = 50;
                break;
            case 6:
            case 7:
                this.speed = this.game.getWidth() / 2.5;
                this.width = this.game.getWidth();
                this.height = this.game.getWidth();
                this.IM = diamondIM;
                this.score = 300;
                break;
        }
    }

    randomXY() {
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
    }

    draw() {
        // this.game.rotate(0);
        this.game.context.drawImage(this.IM, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    size() {
        return Math.sqrt(this.width * this.width + this.height * this.height) / 2;
    }
}