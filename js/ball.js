class Ball {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.prevY = y;
    this.prevX = x;
    this.speed = 5;
    this.vx = 8;
    this.vy = -8;
    this.width = 40;
    this.wallSound = new Audio("./sounds/wall.wav");
    this.img = new Image();
    this.img.src = "./images/ball.png";
    this.isReady = false;
    this.canCollide = true;
    this.img.onload = () => {
      this.height = (this.width * this.img.height) / this.img.width;
      this.isReady = true;
    };
    this.isOff = false;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    this.x += this.vx;
    this.prevY = this.y;
    this.y += this.vy;

    if (this.x <= 0) {
      this.x = 0;
      this.wallSound.play();
      this.invertXDirection();
    } else if (this.x + this.width + 1 >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
      this.wallSound.play();
      this.invertXDirection();
    }
    if (this.y <= 0) {
      this.wallSound.play();
      this.invertYDirection();
    } else if (this.y >= this.ctx.canvas.height) {
      this.isOff = true;
    }
  }

  collideWith(obj) {
    return (
      this.isLeftColliding(obj) ||
      this.isTopColliding(obj) ||
      this.isBottomColliding(obj) ||
      this.isRightColliding(obj)
    );
  }

  isTopColliding(obj) {
    if (this.vy > 0) {
      return false;
    }
    const isBallLeftLimitLowerThanObjRightLimit = this.x < obj.x + obj.width;
    const isBallRightLimitGreaterThanObjLeftLimit = this.x + this.width > obj.x;
    const isBallTopLimitLowerThanObjBottomLimit = this.y < obj.y + obj.height;
    const isBallBottomLimitGreaterThanObjBottomLimit = this.y > obj.y;

    const isColliding =
      isBallLeftLimitLowerThanObjRightLimit &&
      isBallRightLimitGreaterThanObjLeftLimit &&
      isBallTopLimitLowerThanObjBottomLimit &&
      isBallBottomLimitGreaterThanObjBottomLimit;

    if (isColliding) {
      if (obj.hasOwnProperty("status") && obj.status === 1) {
      }
      return true;
    }
    return false;
  }

  isBottomColliding(obj) {
    if (this.vy < 0) {
      return false;
    }
    const isBallLeftLimitLowerThanObjRightLimit = this.x < obj.x + obj.width;
    const isBallRightLimitGreaterThanObjLeftLimit = this.x + this.width > obj.x;
    const isBallBottomLimitGreaterThanObjTopLimit =
      this.y + this.height > obj.y;
    const isBallTopLimitLowerThanObjTopLimit = this.y < obj.y;
    const isColliding =
      isBallLeftLimitLowerThanObjRightLimit &&
      isBallRightLimitGreaterThanObjLeftLimit &&
      isBallBottomLimitGreaterThanObjTopLimit &&
      isBallTopLimitLowerThanObjTopLimit;

    if (isColliding) {
      if (obj instanceof Player) {
      }
      return true;
    }
    return false;
  }

  isRightColliding(obj) {
    if (this.vx < 0) {
      return false;
    }
    const isBallLeftLimitLowerThanObjLeftLimit = this.x < obj.x;
    const isBallRightLimitGreaterThanObjLeftLimit = this.x + this.width > obj.x;
    const isBallTopLimitLowerThanObjBottomLimit = this.y < obj.y + obj.height;
    const isBallBottomLimitGreaterThanObjTopLimit =
      this.y + this.height > obj.y;

    const isColliding =
      isBallLeftLimitLowerThanObjLeftLimit &&
      isBallRightLimitGreaterThanObjLeftLimit &&
      isBallTopLimitLowerThanObjBottomLimit &&
      isBallBottomLimitGreaterThanObjTopLimit;
    if (isColliding) {
      if (obj.hasOwnProperty("status") && obj.status === 1) {
      }
      return true;
    }
    return false;
  }

  isLeftColliding(obj) {
    if (this.vx > 0) {
      return false;
    }
    const isBallLeftLimitLowerThanObjRightLimit = this.x < obj.x + obj.width;
    const isBallRightLimitGreaterThanObjRightLimit =
      this.x + this.width > obj.x + obj.width;
    const isBallTopLimitLowerThanObjBottomLimit = this.y < obj.y + obj.height;
    const isBallBottomLimitGreaterThanObjTopLimit =
      this.y + this.height > obj.y;
    const isColliding =
      isBallLeftLimitLowerThanObjRightLimit &&
      isBallRightLimitGreaterThanObjRightLimit &&
      isBallTopLimitLowerThanObjBottomLimit &&
      isBallBottomLimitGreaterThanObjTopLimit;
    if (isColliding) {
      if (obj.hasOwnProperty("status") && obj.status === 1) {
      }
      return true;
    }
    return false;
  }

  ballPlayerCollision(obj) {
    if (this.isBottomColliding(obj)) {
      const collidePoint = this.getCollidePointInX(obj);
      const ballAngle =
        this.calculateBallAngle(collidePoint) &&
        this.calculateBallAngle(collidePoint);
      this.vx = this.speed * Math.sin(ballAngle);
      this.vy = -this.speed * Math.cos(ballAngle);
    }
  }

  getCollidePointInX(obj) {
    let collidePoint = this.x - (obj.x + obj.width / 2);
    collidePoint = collidePoint / (obj.width / 2);
    return collidePoint;
  }

  calculateBallAngle(collidePoint) {
    return (collidePoint * Math.PI) / 3;
  }

  disableCollide() {
    this.canCollide = false;
  }

  enableCollide() {
    this.canCollide = true;
  }

  invertYDirection() {
    this.vy = -this.vy;
  }

  invertXDirection() {
    this.vx = -this.vx;
  }
}
