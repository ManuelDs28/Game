class Ball {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.prevY = y;
    this.prevX = x;
    this.vx = 2;
    this.vy = -2;
    this.width = 60;
    this.img = new Image();
    this.img.src = "./images/fire-ball.png";
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
      this.vx = -this.vx;
    } else if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
      this.vx = -this.vx;
    }
    if (this.y <= 0) {
      this.vy = -this.vy;
    } else if (this.y >= this.ctx.canvas.height) {
      this.isOff = true;

    }
  }
  
  collideWith(obj) {
    const isBallLeftLimitLowerThanObjRightLimit = this.x < obj.x + obj.width;
    const isBallRightLimitGreaterThanObjLeftLimit = this.x + this.width > obj.x;
    const isBallTopLimitLowerThanObjBottomLimit = this.y < obj.y + obj.height;
    const isBallBottomLimitGreaterThanObjTopLimit =   this.y + this.height > obj.y
    const collision =  
    isBallLeftLimitLowerThanObjRightLimit &&
    isBallRightLimitGreaterThanObjLeftLimit &&
    isBallTopLimitLowerThanObjBottomLimit && 
    isBallBottomLimitGreaterThanObjTopLimit 
  
 
    return collision
  }
 

  disableCollide() {
    this.canCollide = false;
  }

  enableCollide(){
    this.canCollide = true;
  }

  invertYDirection() {
    this.vy = -this.vy 
  }
}
