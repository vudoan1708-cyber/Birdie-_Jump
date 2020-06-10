class Bonus {
    constructor() {
        this.x = width;
        this.y = random(d, height);
        this.r = 60;

    }

    move() {
        this.x -= 5;
    }


    show() {
             
        image(moveForwardsSign, this.x, this.y, this.r * 1.5, this.r);
    }

    collected(birdie2) {
        if (birdie2.x_pos + birdie2.size >= this.x && birdie2.x_pos < this.x + this.r) {
            if (birdie2.y_pos + birdie2.size > this.y && birdie2.y_pos < this.y + this.r) {
                return true;
            }
        }
        return false;
    }

}

class Bonus2 {
    constructor() {
        this.x = width;
        this.y = random(d + 20, height);
        this.r = 60;

    }

    move() {
        this.x -= 5;
    }


    show() {
        // fill(255);
        // rect(this.x, this.y, this.r, this.r);
        image(sizeReduce, this.x, this.y, this.r / 1.5, this.r);        
    }

    collected(birdie2) {
        if (birdie2.x_pos + birdie2.size >= this.x && birdie2.x_pos < this.x + this.r) {
            if (birdie2.y_pos + birdie2.size > this.y && birdie2.y_pos < this.y + this.r) {
                return true;
            }
        }
        return false;
    }

}

class BonusMode1 {
    constructor() {
        this.x = width;
        this.y = random(height / 2, height - d);
        this.size = d / 2;

        this.x2 = width;
        this.y2 = random(height / 2, height - d);
        this.size2 = d / 2;
    }


    moveBackwards() {
        this.x -= 10;
    }

    
    show() {
        image(brickImg, this.x, this.y, this.size, this.size);
    }

    show2() {
        fill(255);
        rect(this.x2, this.y2, this.size2, this.size2);
    }

    collected(birdie) {
        if (birdie.x + birdie.s >= this.x && birdie.x < this.x + this.size) {
            if (birdie.y + birdie.s > this.y && birdie.y < this.y + this.size) {
                return true;
            }
        }
        return false;
    }

}

class BonusMode1_2 {
    constructor() {
        this.x2 = width;
        this.y2 = random(height / 3, height - d);
        this.size2 = d;
    }


    moveBackwards() {
        this.x2 -= 10;
    }

    show() {
        // fill(255);
        // rect(this.x2, this.y2, this.size2, this.size2);
        image(portalImg, this.x2, this.y2, this.size2, this.size2);
    }

    collected(birdie) {
        if (birdie.x + birdie.s >= this.x2 && birdie.x < this.x2 + this.size2) {
            if (birdie.y + birdie.s > this.y2 && birdie.y < this.y2 + this.size2) {
                return true;
            }
        }
        return false;
    }
}