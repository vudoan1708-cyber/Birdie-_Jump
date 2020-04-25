class Wall {
    constructor() {
        this.w = d / 2;
        this.h = d;
        this.x = width / 2;
        this.y = height + this.h;
    }

    show() {
        // fill(255);
        // rect(this.x, this.y, this.w, this.h);
        image(brickImg, this.x, this.y, this.w, this.h);
    }

    buildUp() {  
        this.h = -3 * d;
    }
    
    // update() {
    //     this.y += this.Y_speed;
    // }
}