class Birdie {
	constructor() {
		this.s = 70;
		this.x = 120;
		this.y = height - this.s;
		this.vel_y = 0;
		this.grav = 1.6;
	}

	//mode 1
	jump() {
		//if bird is in between an regular interval of ..., it can be triggered to jump
		if (this.y <= height - this.s && this.y > height - this.s - 20) {
			this.vel_y = -25.5;
			

		}
	}

	move() {
		this.y += this.vel_y;
		this.vel_y += this.grav;
		this.y = constrain(this.y, 0, height - this.s); //make the bird stops at the bottom of the canvas when falling
	}


	//menu display
	show4() {
		image(birdImg4, width, 0, -1.5 * this.x, 1.5 * this.x); //fat purple bird in menu
		// noFill();
		// rect(this.x, this.y, this.s, this.s);
	}

	show3() {
		image(birdImg3, this.x, this.y, this.s, this.s); //purple bird in game mode 1

	}

	show2() {
		image(birdImg2, width, height, -2 * this.x, -2 * this.x); //dark blue bird in menu
	}
	
	update3() {
		image(birdImg3, 0, 0, 1.5 * this.x, 1.5 * this.x);  //purple bird in menu
	}
	
	show1() {
		image(birdImg1, 0, height, 2 * this.x, -2 * this.x); //light blue bird in menu
	}


}  

class Birdie2 {
	constructor() {
		this.x_pos = width / 4 * 3;
		this.y_pos = 0;
		this.fallVelocity = 0;
		this.vel_y2 = 0;
		this.size = 70;
		this.gravity = 1;
		this.afterFall_Gravity = 1.5;
		// this.acc = -0.005;
	}

	show() {

		image(birdImg1, this.x_pos, this.y_pos, this.size, this.size);
	}

	moveBackwards() {
		this.x_pos -= 5;
		collide.play(); //everytime it moves backwards, meaning it gets collided
	}

	jumpForwards() {
		this.x_pos += d * 3; //bird's new position will be set 300 farther from current location
		if (this.x_pos + this.size > width) {
			return this.x_pos = width - this.size; // make sure the bird won't go off the right hand side of canvas
		}
	}


	sizeReduce() {		
		this.size = 30;
	}

	jump() {
		this.vel_y2 = -15;
	}

	updateJump_Vel() {
		this.y_pos += this.vel_y2;
		this.vel_y2 += this.afterFall_Gravity;
		this.y_pos = constrain(this.y_pos, 0, height + 2 * d);
			
	}

	freeFall() {
		this.fallVelocity = 10;
		// this.acc = -0.005;
	}


	//end mode 2
	endMode2() {
		// if bird is intersecting with thorns, or fall off the canvas
		if (this.x_pos < thornSize - 10 || this.y_pos + this.size > height + d) {
			return true;
		}
	}
}

class Birdie3 {
	constructor() {
		this.size_3 = 50;
		this.x_pos3 = width - this.size_3;
		this.y_pos3 = height - this.size_3;	
		this.dx = 5;	
		this.y_speed = 0;
		this.gravity = 2.25;
	}
	jump() {
		this.y_speed = -10;
	}
	isFlying() {
		return this.y_pos3 < height - this.size_3;
	}

	moveY() {
		this.y_pos3 += this.y_speed;
		this.y_speed += this.gravity;
		this.y_pos3 = constrain(this.y_pos3, height - this.size_3 - this.y_pos3, height - this.size_3);
	}

	show() {
		if (this.dx > 0) {
			image(birdImg4, this.x_pos3, this.y_pos3, this.size_3, this.size_3);
		} else {
			scale(-1, 1);
			image(birdImg4, -(this.x_pos3 + this.size_3), this.y_pos3, this.size_3, this.size_3);
		}
	}

	moveX() {
		this.x_pos3 = this.x_pos3 - this.dx;
		//check if bird hits two sides of canvas
		if (this.x_pos3 < 0 || this.x_pos3 + this.size_3 > width) {
			this.dx *= -1; //reverse its movements
		}
	}
}
