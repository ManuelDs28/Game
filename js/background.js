class Background {
	constructor(context) {
		this.context = context;
		this.x = 0;
		this.y = 0;
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;
		this.img = new Image();
		this.img.src = "./images/bg.jpg";
		this.isReady = false;
		this.img.onload = () => {
			this.isReady = true;
		};
	}

	draw() {
		if (this.isReady) {
			this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}