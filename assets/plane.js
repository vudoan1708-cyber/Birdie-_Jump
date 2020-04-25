class Plane {
	constructor() {
		this.s = random(70, 150);
		this.x = width;
		this.y = height - this.s;
		this.vel = 0;
	}


	update() {
		this.x += this.vel;
	}
	move() {
		this.vel -= 0.1;

		// if (score > 5) {
		// 	this.x -= 10;

		// }

		// if (score > 10) {
		// 	this.x -= 5;
		// }

		//Speed up the planes when score is larger than or equal to 5
		for (let k = 0; k < score; k++) { //ignore the loop when score is 0
			if (score / 5 >= 1) { //if score is larger than or equal to 5
				this.vel -= 0.05; //speed up by 1 per loop
				// console.log(k);
			}
		}
	}

	//collision
	hits(birdie) {
		if (birdie.y + birdie.s - 40 > this.y && birdie.y < this.y + this.s) { //if bird collides with a plane in y-axis
			if (birdie.x + birdie.s - 20> this.x && birdie.x < this.x + this.s) {
				return true;
			}
		}
		return false;
	}

	bump(wall) {
		if (wall.x + wall.w > this.x && wall.x < this.x + this.s) {
			return true;
		}
		return false;

	}

	enter(portal) {
		if (portal.x + portal.w > this.x && portal.x < this.x + this.s) {
			return true;
		}
		return false;
	}

	enterReverse(portal) {
		if (portal.x2 + portal.w > this.x && portal.x2 < this.x + this.s) {
			return true;
		}
		return false;
	}


	pause() {
		this.vel = 0;
	}
	
	offScreen() {
		if (this.x < -this.s) {
			return true;
		} else {
		return false;
		}
	}

	show() {
		image(planeImg, this.x, this.y, this.s, this.s);
		// noFill();
		// rect(this.x, this.y, this.s, this.s);
	}
}