class Clouds {
	constructor() {
		this.x = width / 2;
		this.y = d;
		this.vel_x = 0;
	}
	move() {
		this.x -= 5;
	}
	show() {

		image(cloudImg, this.x, this.y, d, d);
	}
}