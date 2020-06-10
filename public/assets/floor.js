class Floors {
    constructor() {
        this.w = random(d, d * 2);
        this.h = random(d / 4, d / 3);
        this.x = width;
        if (time > 9) {
            this.y = random(10, height);
        }
        else {
            this.y = random(d * 2, height);
        }

    }


    move() {
        this.x -= 5;
    }
    
    show() {
        // fill(255, 0, 0);
        // noFill();
        // strokeWeight(2);
        // rect(this.x, this.y, this.w, this.h);
        image(floorImg, this.x, this.y, this.w, this.h);
    }

    // below(birdie) {
    //     image(birdImg1, this.x, this.y - birdie.s, birdie.s, birdie.s); //creating the bird on top of a floor
    // }

    collide(birdie2) {
        //when bird gets collided with the floors
        if (birdie2.y_pos + birdie2.size >= this.y && birdie2.y_pos < this.y + this.h) {
            if (birdie2.x_pos + (birdie2.size / 2) > this.x && birdie2.x_pos + (birdie2.size / 2) < this.x + this.w) {
                return true;
            }
        }

        return false;
    }


    hold(birdie2) {
        //free fall formula: v2^2 = v1^2 + 2*a*d
        // let new_Vel = sqrt(sq(birdie2.fallVelocity) + 2 * birdie2.acc * this.y);
        // return new_Vel;

        // return all the forces back to zero to simulate a landing
        birdie2.gravity *= 0;
        birdie2.fallVelocity *= 0;
        

        // let constrainPoint = birdie2.y_pos + birdie2.size;
        // constrainPoint = constrain(birdie2.y_pos + birdie2.size, 0, this.y);
    }
    offScreen() {
        if (this.x + this.w < 0) {
            return true;
        }
        else {
            return false;
        }
    }

}