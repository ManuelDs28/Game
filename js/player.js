class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.lastY = this.y;
    this.speed = 5;
    this.width = 150;

    this.vx = 0;
    this.img = new Image();
    this.img.src = "./images/player.png";
    this.isReady = false;
    this.img.onload = () => {
      this.height = (this.width * this.img.height) / this.img.width;
      this.isReady = true;
    };

    this.movements = {
      right: false,
      left: false,
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  move() {
    if (this.movements.left) {
      this.vx = -this.speed;
    } else if (this.movements.right) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;

    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
    }
  }

  directions(event) {
    const status = event.type === "keydown";
    if (event.keyCode === 37) {
      this.movements.left = status;
    } else if (event.keyCode === 39) {
      this.movements.right = status;
    }
  }
}
