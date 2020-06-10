class drawCanon {
    constructor() {
	this.size = 40;
	this.x = 40;
    this.y = height / 3 - this.size;
    }

    show() {
        for (let i = 0; i < cols_mode3; i++) {
            image(canonImg, this.x + (i * w), this.y, this.size, this.size);
        }
    }
}